import StripeAPI from "stripe";
import { ProcessEnvType, TicketType } from "../types";

type CreateProductProps = {
  meetingId: number;
  title: string;
  tickets: TicketType[];
};

type UpdateProductProps = CreateProductProps & {
  productId: string;
};

const {
  STRIPE_PAYMENT_INTENT_SECRET,
  STRIPE_SECRET_KEY,
} = process.env as ProcessEnvType;

const stripe = new StripeAPI(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const formatPrice = (num: number) => num * 100;

const createPrice = async (
  ticket: TicketType,
  productId: string,
  meetingId: number
) => {
  const { id } = await stripe.prices.create({
    currency: "usd",
    unit_amount: formatPrice(ticket.price),
    product: productId,
    metadata: {
      meetingId,
      productId,
    },
  });
  return {
    ...ticket,
    id,
  } as TicketType;
};

const updatePrice = async (
  ticket: TicketType,
  productId: string,
  meetingId: number
) => {
  // You can't really update a price in Stripe,
  // so we delete the old one and create a brand new
  await stripe.prices.update(ticket.id, { active: false });
  return createPrice(ticket, productId, meetingId);
};

const listAllPaymentIntents = async (productId: string) => {
  const getPage = async (
    paymentIntents: StripeAPI.PaymentIntent[],
    startingAfter?: string
  ): Promise<StripeAPI.PaymentIntent[]> => {
    const { data, has_more } = await stripe.paymentIntents.list({
      limit: 100,
      starting_after: startingAfter,
    });

    const newPaymentIntents = [...paymentIntents, ...data];

    if (has_more) {
      return await getPage(newPaymentIntents, data[data.length - 1].id);
    }
    return newPaymentIntents;
  };
  const allPaymentIntents = await getPage([]);
  return allPaymentIntents.filter(({ status, metadata }) => {
    return status === "succeeded" && metadata.productId === productId;
  });
};

const Stripe = {
  ping: async () => {
    await Promise.all([
      stripe.products.list({ limit: 1 }),
      stripe.prices.list({ limit: 1 }),
    ]);
    return true;
  },
  getPrice: async (id: string) => {
    return await stripe.prices.retrieve(id);
  },
  listProductPrices: async (productId: string) => {
    const getPage = async (
      prices: StripeAPI.Price[],
      startingAfter?: string
    ): Promise<StripeAPI.Price[]> => {
      const { data, has_more } = await stripe.prices.list({
        active: true,
        product: productId,
        limit: 100,
        starting_after: startingAfter,
      });

      const newPrices = [...prices, ...data];

      if (has_more) {
        return await getPage(newPrices, data[data.length - 1].id);
      }
      return newPrices;
    };
    return await getPage([]);
  },
  getProduct: async (id: string) => {
    return await stripe.products.retrieve(id);
  },
  createProduct: async ({ meetingId, title, tickets }: CreateProductProps) => {
    const { id: productId } = await stripe.products.create({
      name: title,
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
  updateProduct: async ({
    productId,
    meetingId,
    title,
    tickets,
  }: UpdateProductProps) => {
    // Update product, we don't need to await
    stripe.products.update(productId, {
      name: title,
    });

    const prices = await Stripe.listProductPrices(productId);

    // Deactivate deleted prices
    await Promise.all(
      prices.map((price) => {
        const found = tickets.find((ticket) => ticket.id === price.id);
        if (!found) {
          console.log(`deactivating price: ${price.id}`);
          return stripe.prices.update(price.id, { active: false });
        }
      })
    );

    const ticketsPromises = tickets.map((ticket) => {
      // If the ticket has no id, that means it's a new one
      if (!ticket.id) {
        console.log("creating-new-price");
        return createPrice(ticket, productId, meetingId);
      }
      // Tries to find a price in Stripe with that id
      const found = prices.find((price) => ticket.id === price.id);

      // If the price wasn't found, it means something went wrong
      // As a safety measure we should still create a price and get a different id
      if (!found) {
        console.log("creating-new-price-b");
        return createPrice(ticket, productId, meetingId);
      }

      if (found.unit_amount !== formatPrice(ticket.price)) {
        console.log("updating-price");
        return updatePrice(ticket, productId, meetingId);
      }
      console.log("not-touching-price");
      return ticket;
    });

    const updatedTickets = await Promise.all(ticketsPromises);

    console.log({
      insideStripeUpdate: updatedTickets,
    });

    return updatedTickets;
  },
  deleteProduct: async (productId: string) => {
    const prices: StripeAPI.Price[] = (await stripe.prices.list({
      product: productId,
      active: true,
    })) as any;

    // Deactivate deleted prices
    const promises = prices.map((price) => {
      return stripe.prices.update(price.id, { active: false });
    });

    // Get all paymentIntents associated with the product
    const [paymentIntents] = await Promise.all([
      listAllPaymentIntents(productId),
      Promise.all(promises),
    ]);

    // For each paymentIntent, create a refund
    await Promise.all(
      paymentIntents.map((paymentIntent) => {
        return stripe.refunds.create({
          payment_intent: paymentIntent.id,
          reason: "requested_by_customer",
          metadata: paymentIntent.metadata,
        });
      })
    );

    return;
  },
  getPaymentIntent: async (id: string) => {
    return await stripe.paymentIntents.retrieve(id);
  },
  createPaymentIntent: async (price: StripeAPI.Price, title: string) => {
    return await stripe.paymentIntents.create({
      amount: price.unit_amount!,
      currency: price.currency,
      metadata: price.metadata,
      description: title,
    });
  },
  constructEvent: (rawBody: string, signature: string) => {
    return stripe.webhooks.constructEvent(
      rawBody,
      signature,
      STRIPE_PAYMENT_INTENT_SECRET
    );
  },
};

export default Stripe;
