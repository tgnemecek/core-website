import assert from "assert";
import sinon, { SinonSpy } from "sinon";
import Stripe from "./services/Stripe";
import Zoom from "./services/Zoom";
import Core from "./services/Core";
import { MockAPIEvent, MockNetlifyContext } from "./mocks/index.mock";
import { EventCreateBody } from "./types";
import { eventCreate } from "./event-create";

describe("#eventCreate", () => {
  const body: EventCreateBody = {
    id: "this-is-the-id",
    isOnline: true,
    title: "10 Steps to Cure Stress",
    subtitle: "An amazing event for you",
    duration: 30,
    date: new Date(),
    tickets: [
      {
        id: "ticket-id",
        description: "This is a Premium Ticket",
        price: 50,
        endsOn: "startOfEvent",
        extra: "",
      },
    ],
  };
  const context = new MockNetlifyContext();

  beforeEach(() => {
    Zoom.ping = sinon.stub().resolves();
    Zoom.createMeeting = sinon.stub().resolves({
      meetingId: "this-is-the-meeting-id",
    });
    Stripe.ping = sinon.stub().resolves();
    Stripe.createProduct = sinon.stub().resolves({
      productId: "this-is-the-product-id",
      ticketsWithId: body.tickets.map((ticket) => ({
        ...ticket,
        id: "this-is-the-ticket-id",
      })),
    });
    Core.encryptEventIds = sinon.stub().resolves("this-is-the-fused-id");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("responds with status code 200", async () => {
    const event = new MockAPIEvent({ body });
    const res = await eventCreate(event, context);

    assert.strictEqual(res.statusCode, 200);
  });

  it("responds with status code 403", async () => {
    const event = new MockAPIEvent();
    const context = new MockNetlifyContext({
      clientContext: {},
    } as any);
    const res = await eventCreate(event, context);

    assert.strictEqual(res.statusCode, 403);
  });

  it("responds with status code 400", async () => {
    const event = new MockAPIEvent();
    const res = await eventCreate(event, context);

    assert.strictEqual(res.statusCode, 400);
  });

  it("responds with status code 503 if Zoom is down", async () => {
    Zoom.ping = sinon.stub().throws();

    const event = new MockAPIEvent({ body });
    const res = await eventCreate(event, context);

    assert.strictEqual(res.statusCode, 503);
  });

  it("responds with status code 503 if Stripe is down", async () => {
    Stripe.ping = sinon.stub().throws();

    const event = new MockAPIEvent({ body });
    const res = await eventCreate(event, context);

    assert.strictEqual(res.statusCode, 503);
  });
});
