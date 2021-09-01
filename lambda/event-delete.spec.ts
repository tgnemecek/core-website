import assert from "assert";
import sinon from "sinon";
import Email from "./services/Email";
import Stripe from "./services/Stripe";
import Zoom from "./services/Zoom";
import Core from "./services/Core";
import { MockAPIEvent, MockNetlifyContext } from "./mocks/index.mock";
import { EventDeleteBody } from "./types";
import { eventDelete } from "./event-delete";

describe("#eventDelete", () => {
  const body: EventDeleteBody = {
    id: "this-is-the-id-to-delete",
  };
  const context = new MockNetlifyContext();

  beforeEach(() => {
    Core.decryptEventIds = sinon.stub().resolves({
      meetingId: "this-is-the-meeting-id",
      productId: "this-is-the-product-id",
    });
    Stripe.ping = sinon.stub().resolves();
    Zoom.getMeeting = sinon.stub().resolves({
      topic: "this-is-the-meeting-topic",
    });
    Zoom.listRegistrants = sinon.stub().resolves([
      {
        email: "registrant-email",
        first_name: "Registrant Name",
      },
    ]);
    Email.send = sinon.stub();
    Zoom.deleteMeeting = sinon.stub();
    Stripe.deleteProduct = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("responds with status code 200", async () => {
    const event = new MockAPIEvent({ body });
    const res = await eventDelete(event, context);

    assert.strictEqual(res.statusCode, 200);
  });

  it("responds with status code 403", async () => {
    const event = new MockAPIEvent();
    const context = new MockNetlifyContext({
      clientContext: {},
    } as any);
    const res = await eventDelete(event, context);

    assert.strictEqual(res.statusCode, 403);
  });

  it("responds with status code 503 if Stripe is down", async () => {
    Stripe.ping = sinon.stub().throws();

    const event = new MockAPIEvent({ body });
    const res = await eventDelete(event, context);

    assert.strictEqual(res.statusCode, 503);
  });
});
