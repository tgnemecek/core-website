import { CmsCollectionFile } from "netlify-cms-core";
import getStaticPageFields from "../get-static-page-fields";
import ServicesFields from "./ServicesFields";

const CommunityPage: CmsCollectionFile = {
  file: "src/collections/pages/community.md",
  label: "Community Page",
  name: "community",
  fields: [
    ...getStaticPageFields("community", "CommunityPage"),
    ...ServicesFields,
  ],
};

export default CommunityPage;
