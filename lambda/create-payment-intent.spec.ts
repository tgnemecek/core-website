import assert from "assert";
import sinon, { SinonSpy } from "sinon";
import Stripe from "./services/Stripe";
import { MockAPIEvent, MockNetlifyContext } from "./mocks/index.mock";
import { CreatePaymentIntentBody } from "./types";
import { createPaymentIntent } from "./create-payment-intent";

describe("#createPaymentIntent", () => {
  const body: CreatePaymentIntentBody = {
    ticketId: "123",
    title: "10 Steps to Cure Stress",
    timezone: "America/Toronto",
  };
  const context = new MockNetlifyContext();
  const clientSecret = "this-is-the-secret";

  beforeEach(() => {
    Stripe.getPrice = sinon.stub().resolves({});
    Stripe.createPaymentIntent = sinon.stub().resolves({
      client_secret: clientSecret,
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("responds with status code 200", async () => {
    const event = new MockAPIEvent({ body });
    const res = await createPaymentIntent(event, context);

    assert.strictEqual(res.statusCode, 200);
  });

  it("responds with status code 400", async () => {
    const event = new MockAPIEvent();
    const res = await createPaymentIntent(event, context);

    assert.strictEqual(res.statusCode, 400);
  });

  it("responds with correct data", async () => {
    const event = new MockAPIEvent({ body });
    const res = await createPaymentIntent(event, context);

    assert.strictEqual(JSON.parse(res.body).clientSecret, clientSecret);
  });

  it("calls getPrice with correct args", async () => {
    const event = new MockAPIEvent({ body });
    await createPaymentIntent(event, context);

    assert((Stripe.getPrice as SinonSpy).calledOnceWith(body.ticketId));
  });

  it("calls createPaymentIntent with correct args", async () => {
    const event = new MockAPIEvent({ body });
    await createPaymentIntent(event, context);

    assert(
      (Stripe.createPaymentIntent as SinonSpy).calledOnceWith({
        price: {},
        title: body.title,
        timezone: body.timezone,
      })
    );
  });
});
