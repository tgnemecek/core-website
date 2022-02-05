import assert from "assert";
import getStaticPageFields from "../get-static-page-fields";
import ServicesFields from "./ServicesFields";
import LearningPage from "./LearningPage";

describe("#LearningPageCmsConfig", () => {
  it("has the correct number of fields", () => {
    const staticPageFields = getStaticPageFields("", "").length;
    const numberOfServices = ServicesFields.length;
    const expectedFields = staticPageFields + numberOfServices;

    const pageFields = LearningPage.fields.length;

    assert.strictEqual(pageFields, expectedFields);
  });
});

export default LearningPage;
