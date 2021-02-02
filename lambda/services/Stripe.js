const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
      const price = await stripe.prices.retrieve(id);
    } catch (err) {
      console.error(`Error while retrieving price.`);
      throw err;
    }
  },
  createPrice: async (ticket, productId) => {
    try {
      const { id } = await stripe.prices.create({
        currency: "usd",
        unit_amount: Stripe.formatPrice(ticket.price),
        product: productId,
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
          return Stripe.createPrice(ticket, productId);
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
  processPayment: async (args) => {
    const { amount, title, currency, meetingId, productId } = args;
    try {
      const { data } = await stripe.orders.create({
        currency,
        items: [
          {
            amount,
          },
        ],
        confirm: true,
        payment_method_types: ["card"],
        description: title,
        metadata: {
          meetingId,
          productId,
        },
      });
      return data;
    } catch (err) {
      console.error(`Error while processing payment.`);
      throw err;
    }
  },
  createCheckout: async (priceId) => {
    try {
      const session = await stripe.checkout.sessions.create({
        cancel_url: "https://www.corecoachingconsole.com/#cancel",
        success_url: "https://www.corecoachingconsole.com",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            amount,
          },
        ],
      });
      return session;
    } catch (err) {
      console.error(`Error while creating checkout.`);
      throw err;
    }
  },
};

module.exports = Stripe;
