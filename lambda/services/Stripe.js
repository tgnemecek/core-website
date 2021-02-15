const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { STRIPE_PAYMENT_INTENT_SECRET } = process.env;

const formatPrice = (num) => num * 100;

const createPrice = async (ticket, productId, meetingId) => {
  const { id } = await stripe.prices.create({
    currency: "usd",
    unit_amount: formatPrice(ticket.price),
    product: productId,
    metadata: {
      meetingId,
    },
  });
  return {
    ...ticket,
    id,
  };
};

const updatePrice = async (ticket, productId, meetingId) => {
  // You can't really update a price in Stripe,
  // so we delete the old one and create a brand new
  await stripe.prices.update(ticket.id, { active: false });
  return createPrice(ticket, productId, meetingId);
};

const Stripe = {
  ping: async () => {
    return Promise.all([
      stripe.products.list({ limit: 1 }),
      stripe.prices.list({ limit: 1 }),
    ]);
  },
  getPrice: async (id) => {
    return await stripe.prices.retrieve(id);
  },
  createProduct: async ({ meetingId, title, subtitle, tickets }) => {
    const { id: productId } = await stripe.products.create({
      name: title,
      description: subtitle,
      metadata: {
        meetingId,
      },
    });
    const ticketsWithId = await Promise.all(
      tickets.map((ticket) => {
        return createPrice(ticket, productId, meetingId);
      })
    );
    return { productId, ticketsWithId };
  },
  updateProduct: async ({ productId, meetingId, title, subtitle, tickets }) => {
    // Update product, we don't need to await
    stripe.products.update(productId, {
      name: title,
      description: subtitle,
    });

    const prices = await stripe.prices.list({
      product: productId,
      active: true,
    });

    // Deactivate deleted prices, we don't need to await
    prices.forEach((price) => {
      const found = tickets.find((ticket) => ticket.id === price.id);
      if (!found) {
        stripe.prices.update(price.id, { active: false });
      }
    });

    const ticketsPromises = tickets.map((ticket) => {
      // If the ticket has no id, that means it's a new one
      if (!ticket.id) {
        return createPrice(ticket, productId, meetingId);
      }
      // Tries to find a price in Stripe with that id
      const found = prices.find((price) => ticket.id === price.id);

      // If the price wasn't found, it means something went wrong
      // As a safety measure we should still create a price and get a different id
      if (!found) {
        return createPrice(ticket, productId, meetingId);
      }
      return updatePrice(ticket, productId, meetingId);
    });

    const updatedTickets = await Promise.all(ticketsPromises);

    return updatedTickets;
  },
  createPaymentIntent: async (price) => {
    return await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: price.currency,
      metadata: price.metadata,
    });
  },
  constructEvent: (rawBody, signature) => {
    return stripe.webhooks.constructEvent(
      rawBody,
      signature,
      STRIPE_PAYMENT_INTENT_SECRET
    );
  },
};

module.exports = Stripe;
