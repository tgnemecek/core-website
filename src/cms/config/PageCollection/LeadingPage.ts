import { CmsCollectionFile } from "netlify-cms-core";
import getStaticPageFields from "../get-static-page-fields";
import ServicesFields from "./ServicesFields";

const LeadingPage: CmsCollectionFile = {
  file: "src/collections/pages/leading.md",
  label: "Leading Page",
  name: "leading",
  fields: [...getStaticPageFields("leading", "LeadingPage"), ...ServicesFields],
};

export default LeadingPage;
