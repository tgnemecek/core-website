import assert from "assert";
import sinon from "sinon";
import { MockThinkificProduct } from "../mocks/index.mock";
import { ThinkificProduct, Course } from "../types";
import Thinkific from "./Thinkific";

const fetch = require("node-fetch");

const sandbox = sinon.createSandbox();

describe("#Thinkific", async () => {
  describe("getCourses", async () => {
    let request: sinon.SinonStub;

    beforeEach(() => {
      request = sandbox.stub(fetch, "default");
      sandbox.stub(Thinkific, "toDTO").returnsArg(0);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns courses when status code is 200", async () => {
      const products = new Array(1)
        .fill(null)
        .map(() => new MockThinkificProduct().toObject());

      request.returns({
        status: 200,
        json: () => Promise.resolve({ items: products }),
      });

      const res = await Thinkific.getCourses();

      assert.deepStrictEqual(
        res,
        products,
        "Expected request to return products"
      );
    });

    it("filters hidden courses", async () => {
      const products = new Array(10)
        .fill(null)
        .map((_, i) =>
          new MockThinkificProduct({ hidden: i === 5 }).toObject()
        );

      request.returns({
        status: 200,
        json: () => Promise.resolve({ items: products }),
      });

      const res = await Thinkific.getCourses();

      assert.deepStrictEqual(
        res.length,
        products.length - 1,
        "Expected request to return only visible products"
      );
    });

    it("throws error if status code is not 200", async () => {
      request.returns({
        status: 500,
      });

      await assert.rejects(Thinkific.getCourses);
    });
  });
  describe("toDTO", async () => {
    it("should format the product correctly", async () => {
      const dataProduct: ThinkificProduct = {
        id: 10,
        name: "My Product",
        slug: "product",
        description: "something-here",
        status: "published",
        card_image_url: "url-here.com",
        hidden: false,
      };

      const dataCourse: Course = {
        id: 10,
        name: "My Product",
        slug: "product",
        description: "something-here",
        image: "url-here.com",
      };

      const product = new MockThinkificProduct(dataProduct).toObject();
      const course = Thinkific.toDTO(product);

      assert.deepStrictEqual(
        course,
        dataCourse,
        "Expected the DTO to be equal to the course"
      );
    });
  });
});
