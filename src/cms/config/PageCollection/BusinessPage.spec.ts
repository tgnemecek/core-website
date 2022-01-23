import assert from "assert";
import getStaticPageFields from "../get-static-page-fields";
import ServicesFields from "./ServicesFields";
import BusinessPage from "./BusinessPage";

describe("#BusinessPageCmsConfig", () => {
  it("has the correct number of fields", () => {
    const staticPageFields = getStaticPageFields("", "").length;
    const numberOfServices = ServicesFields.length;
    const expectedFields = staticPageFields + numberOfServices;

    const pageFields = BusinessPage.fields.length;

    assert.strictEqual(pageFields, expectedFields);
  });
});

export default BusinessPage;
