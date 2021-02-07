const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { STRIPE_PAYMENT_INTENT_SECRET } = process.env;

const Stripe = {
  formatPrice: (num) => num * 100,
  listProducts: async () => {
    try {
      return await stripe.products.list();
    } catch (err) {
      console.error(`Error while retrieving products.`);
      throw err;
    }
  },
  getProduct: async (id) => {
    try {
      return await stripe.products.get(id);
    } catch (err) {
      console.error(`Error while retrieving product.`);
      throw err;
    }
  },
  getPrice: async (id) => {
    try {
      return await stripe.prices.retrieve(id);
    } catch (err) {
      console.error(`Error while retrieving price.`);
      throw err;
    }
  },
  createPrice: async (ticket, productId, meetingId) => {
    try {
      const { id } = await stripe.prices.create({
        currency: "usd",
        unit_amount: Stripe.formatPrice(ticket.price),
        product: productId,
        metadata: {
          meetingId,
        },
      });
      return {
        ...ticket,
        id,
      };
    } catch (err) {
      console.error(`Error while creating prices.`);
      throw err;
    }
  },
  createProduct: async ({ name, description, tickets, meetingId }) => {
    try {
      const { id: productId } = await stripe.products.create({
        name,
        description,
        metadata: {
          meetingId,
        },
      });
      const ticketsWithId = await Promise.all(
        tickets.map((ticket) => {
          return Stripe.createPrice(ticket, productId, meetingId);
        })
      );

      return { productId, ticketsWithId };
    } catch (err) {
      console.error(`Error while creating product.`);
      throw err;
    }
  },
  updatePrices: async (tickets, prices, productId) => {
    const ticketsModified = tickets.filter((ticket) => {
      if (!ticket.id) return false;
      const foundPrice = prices.find((price) => {
        return price.id === ticket.id;
      });
      if (foundPrice) {
        return foundPrice.unit_amount !== Stripe.formatPrice(ticket.price);
      }
      return false;
    });

    const newTickets = tickets.filter((ticket) => {
      return !ticket.id;
    });

    const newTicketsWithId = await Promise.all(
      newTickets.map(async (ticket) => {
        return Stripe.createPrice(ticket, productId);
      })
    );

    const updatedTickets = await Promise.all(
      // TODO: According to the Stripe API,
      // you can't delete a price, or change the amount, so you have to
      // set active = false and add a new price.
      ticketsModified.map(async (ticket) => {
        return stripe.prices.update(ticket.id, {
          unit_amount: Stripe.formatPrice(ticket.price),
        });
      })
    );

    return [...updatedTickets, ...newTicketsWithId];
  },
  getPrices: async (productId) => {
    try {
      const { data } = await stripe.prices.list({
        product: productId,
      });
      return data;
    } catch (err) {
      console.error(`Error while retrieving prices.`);
      throw err;
    }
  },
  createPaymentIntent: async (price) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price.unit_amount,
        currency: price.currency,
        metadata: price.metadata,
      });
      return paymentIntent;
    } catch (err) {
      console.error(`Error while creating Payment Intent.`);
      throw err;
    }
  },
  constructEvent: (rawBody, signature) => {
    try {
      return stripe.webhooks.constructEvent(
        rawBody,
        signature,
        STRIPE_PAYMENT_INTENT_SECRET
      );
    } catch (err) {
      console.error(`Error while validating signature.`);
      throw err;
    }
  },
};

module.exports = Stripe;
