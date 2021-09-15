import assert from "assert";
import sinon from "sinon";
import { Thinkific } from "./services";
import {
  MockCourse,
  MockAPIEvent,
  MockNetlifyContext,
} from "./mocks/index.mock";
import { getCourses } from "./get-courses";

const sandbox = sinon.createSandbox();

describe("#getCourses", () => {
  const event = new MockAPIEvent();
  const context = new MockNetlifyContext();

  afterEach(() => {
    sandbox.restore();
  });

  it("responds with status code 200", async () => {
    sandbox.stub(Thinkific, "getCourses").resolves([]);
    const res = await getCourses(event, context);
    assert.strictEqual(res.statusCode, 200);
  });

  it("returns the correct data", async () => {
    const courses = new Array(10)
      .fill(null)
      .map(() => new MockCourse().toObject());

    sandbox.stub(Thinkific, "getCourses").resolves(courses);

    const res = await getCourses(event, context);

    assert.deepStrictEqual(
      JSON.parse(res.body).courses,
      courses,
      "Expected courses to be returned"
    );
  });
});
