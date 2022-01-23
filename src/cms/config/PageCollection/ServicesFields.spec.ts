import assert from "assert";
import { ServicePage as ServicePageType, PickOnlyRequired } from "types";
import { validateCmsField } from "tests";
import ServicesFields from "./ServicesFields";

type ServicePageRequiredOnly = PickOnlyRequired<ServicePageType>;

class ServicePage implements ServicePageRequiredOnly {
  title = "Service Page Title";
  explanation = {
    text: "This is how it works",
    image: "www.image.com",
  };
  benefits = "This is why it's good for you";
}

describe("#ServicesFieldsCmsConfig", () => {
  let instance: ServicePage;

  beforeEach(() => {
    instance = new ServicePage();
  });

  it("has the correct number of fields", () => {
    const expectedNumberOfFields = Object.keys(instance).length;
    const actualNumberOfFields = ServicesFields.length;

    assert.strictEqual(actualNumberOfFields, expectedNumberOfFields);
  });
  it("has matching types", () => {
    ServicesFields.forEach((field) => {
      validateCmsField(field, (instance as any)[field.name as any]);
    });
  });
});
