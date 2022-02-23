import assert from "assert";
import { LegalPage as LegalPageType, PickOnlyRequired } from "types";
import getStaticPageFields from "../get-static-page-fields";
import LegalPage from "./LegalPage";

type LegalPageRequiredOnly = PickOnlyRequired<LegalPageType>;

class LegalPageClass implements LegalPageRequiredOnly {
  privacyPolicy = "Some text";
  termsAndConditions = "Other text";
}

describe("#LegalPageCmsConfig", () => {
  it("has the correct number of fields", () => {
    const staticPageFields = getStaticPageFields("", "").length;
    const classFields = Object.keys(new LegalPageClass()).length;
    const expectedFields = staticPageFields + classFields;

    const pageFields = LegalPage.fields.length;

    assert.strictEqual(pageFields, expectedFields);
  });
});

export default LegalPage;
