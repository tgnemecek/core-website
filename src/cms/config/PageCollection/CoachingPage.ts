import { CmsCollectionFile } from "netlify-cms-core";
import getStaticPageFields from "../get-static-page-fields";
import ServicesFields from "./ServicesFields";

const CoachingPage: CmsCollectionFile = {
  file: "src/collections/pages/coaching.md",
  label: "Coaching Page",
  name: "coaching",
  fields: [
    ...getStaticPageFields("coaching", "CoachingPage"),
    ...ServicesFields,
  ],
};

export default CoachingPage;
