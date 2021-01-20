const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPrice = async (ticket, { productId, amount = "0" }) => {
  try {
    const { id } = await stripe.prices.create({
      currency: "usd",
      unit_amount: amount,
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
};

module.exports = {
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
  createProduct: async ({ name, description, tickets, url }) => {
    try {
      const { id: productId } = await stripe.products.create({
        name,
        description,
        metadata: {
          url,
        },
      });
      const ticketsWithId = await Promise.all(
        tickets.map((ticket, i) => {
          return createPrice(ticket, {
            productId,
            amount: (i * 100).toString(),
          });
        })
      );

      return { productId, tickets: ticketsWithId };
    } catch (err) {
      console.error(`Error while creating product.`);
      throw err;
    }
  },
  getPrices: async (productId) => {
    try {
      return await stripe.prices.list({
        product: productId,
      });
    } catch (err) {
      console.error(`Error while retrieving prices.`);
      throw err;
    }
  },
};
