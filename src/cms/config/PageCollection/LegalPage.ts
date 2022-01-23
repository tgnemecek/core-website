import { CmsCollectionFile, CmsFieldStringOrText } from "netlify-cms-core";
import { LegalPage as LegalPageType, TypeSafeCmsField } from "types";
import getStaticPageFields from "../get-static-page-fields";

const PrivacyPolicy: TypeSafeCmsField<
  LegalPageType["privacyPolicy"],
  CmsFieldStringOrText
> = {
  label: "Privacy Policy",
  name: "privacyPolicy",
  widget: "text",
  required: false,
};

const TermsAndConditions: TypeSafeCmsField<
  LegalPageType["termsAndConditions"],
  CmsFieldStringOrText
> = {
  label: "Purchase Terms",
  name: "termsAndConditions",
  widget: "text",
  required: false,
};

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
