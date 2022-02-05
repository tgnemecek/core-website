import { CmsCollectionFile } from "netlify-cms-core";
import getStaticPageFields from "../get-static-page-fields";
import ServicesFields from "./ServicesFields";

const BusinessPage: CmsCollectionFile = {
  file: "src/collections/pages/business.md",
  label: "Business Page",
  name: "business",
  fields: [
    ...getStaticPageFields("business", "BusinessPage"),
    ...ServicesFields,
  ],
};

export default BusinessPage;
