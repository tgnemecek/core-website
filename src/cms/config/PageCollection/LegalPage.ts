import { CmsCollectionFile } from "netlify-cms-core";
import { LegalPage as LegalPageType } from "types";
import getStaticPageFields from "../get-static-page-fields";
import generateCmsField from "../generate-cms-field";

const PrivacyPolicy = generateCmsField<LegalPageType["privacyPolicy"]>({
  label: "Privacy Policy",
  name: "privacyPolicy",
  widget: "text",
  required: false,
});

const TermsAndConditions = generateCmsField<
  LegalPageType["termsAndConditions"]
>({
  label: "Purchase Terms",
  name: "termsAndConditions",
  widget: "text",
  required: false,
});

const LegalPage: CmsCollectionFile = {
  file: "src/collections/pages/legal.md",
  label: "Legal Page",
  name: "legal",
  fields: [
    ...getStaticPageFields("legal", "LegalPage"),
    PrivacyPolicy,
    TermsAndConditions,
  ],
};

export default LegalPage;
