import { CmsCollectionFile } from "netlify-cms-core";
import getStaticPageFields from "../get-static-page-fields";
import ServicesFields from "./ServicesFields";

const LearningPage: CmsCollectionFile = {
  file: "src/collections/pages/learning.md",
  label: "Learning Page",
  name: "learning",
  fields: [
    ...getStaticPageFields("learning", "LearningPage"),
    ...ServicesFields,
  ],
};

export default LearningPage;
