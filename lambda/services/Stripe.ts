import StripeAPI from "stripe";
import { ProcessEnvType, TicketType } from "../types";

type CreateProductProps = {
  meetingId: number;
  title: string;
  subtitle: string;
  tickets: TicketType[];
};

type UpdateProductProps = CreateProductProps & {
  productId: string;
};

const stripe = new StripeAPI("sk_test_...", {
  apiVersion: "2020-08-27",
});

const { STRIPE_PAYMENT_INTENT_SECRET } = process.env as ProcessEnvType;

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
  createProduct: async ({
    meetingId,
    title,
    subtitle,
    tickets,
  }: CreateProductProps) => {
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
  updateProduct: async ({
    productId,
    meetingId,
    title,
    subtitle,
    tickets,
  }: UpdateProductProps) => {
    // Update product, we don't need to await
    stripe.products.update(productId, {
      name: title,
      description: subtitle,
    });

    const prices: StripeAPI.Price[] = (await stripe.prices.list({
      product: productId,
      active: true,
    })) as any;

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
  createPaymentIntent: async (price: StripeAPI.Price) => {
    return await stripe.paymentIntents.create({
      amount: price.unit_amount!,
      currency: price.currency,
      metadata: price.metadata,
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
