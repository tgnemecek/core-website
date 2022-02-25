import assert from "assert";
import sinon from "sinon";
import Stripe from "./services/Stripe";
import Core from "./services/Core";
import Zoom from "./services/Zoom";
import Email from "./services/Email";
import { MockAPIEvent, MockNetlifyContext } from "./mocks/index.mock";
import { EventRegisterFreeBody } from "./types";
import { eventRegisterFree } from "./event-register-free";

describe("#eventRegisterFree", () => {
  const body: EventRegisterFreeBody = {
    eventId: "event-123",
    ticketId: "ticket-456",
    timezone: "America/Toronto",
    firstName: "Random",
    lastName: "Person",
    email: "random@email.com",
  };
  const context = new MockNetlifyContext();

  beforeEach(() => {
    Stripe.getPrice = sinon.stub().resolves({ unit_amount: 0 });
    Core.decryptEventIds = sinon.stub().returns({ meetingId: "789" });
    Zoom.addRegistrant = sinon.stub().resolves({
      joinUrl: "http://www.google.com",
      topic: "My Topic",
      startTime: new Date().toISOString(),
    });
    Email.send = sinon.stub().resolves();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("responds with status code 200", async () => {
    const event = new MockAPIEvent({ body });
    const res = await eventRegisterFree(event, context);

    const getPrice = Stripe.getPrice as sinon.SinonStub;
    const decryptEventIds = Core.decryptEventIds as sinon.SinonStub;
    const addRegistrant = Zoom.addRegistrant as sinon.SinonStub;
    const send = Email.send as sinon.SinonStub;

    sinon.assert.calledOnceWithExactly(getPrice, "ticket-456");
    sinon.assert.calledOnceWithExactly(decryptEventIds, "event-123");
    sinon.assert.calledOnceWithExactly(addRegistrant, {
      meetingId: 789,
      email: "random@email.com",
      firstName: "Random",
      lastName: "Person",
      timezone: "America/Toronto",
    });
    sinon.assert.calledOnceWithMatch(send, {
      template: "meeting-purchase",
      to: "random@email.com",
      tags: {
        firstName: "Random",
        meetingName: "My Topic",
        meetingLink: "http://www.google.com",
      },
    });

    assert.strictEqual(res.statusCode, 200);
  });

  it("responds with status code 400", async () => {
    const event = new MockAPIEvent();
    const res = await eventRegisterFree(event, context);

    assert.strictEqual(res.statusCode, 400);
  });

  it("responds with status code 403", async () => {
    Stripe.getPrice = sinon.stub().resolves({ unit_amount: 100 });

    const event = new MockAPIEvent({ body });
    const res = await eventRegisterFree(event, context);

    const getPrice = Stripe.getPrice as sinon.SinonStub;
    sinon.assert.calledOnceWithExactly(getPrice, "ticket-456");

    assert.strictEqual(res.statusCode, 403);
  });
});
