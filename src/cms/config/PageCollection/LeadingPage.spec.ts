import assert from "assert";
import getStaticPageFields from "../get-static-page-fields";
import ServicesFields from "./ServicesFields";
import LeadingPage from "./LeadingPage";

describe("#LeadingPageCmsConfig", () => {
  it("has the correct number of fields", () => {
    const staticPageFields = getStaticPageFields("", "").length;
    const numberOfServices = ServicesFields.length;
    const expectedFields = staticPageFields + numberOfServices;

    const pageFields = LeadingPage.fields.length;

    assert.strictEqual(pageFields, expectedFields);
  });
});

export default LeadingPage;
