import { CmsCollection } from "netlify-cms-core";
import LandingPage from "./LandingPage";
import TeamPage from "./TeamPage";
import LegalPage from "./LegalPage";
import BusinessPage from "./BusinessPage";
import CoachingPage from "./CoachingPage";
import LeadingPage from "./LeadingPage";
import CommunityPage from "./CommunityPage";

const PageCollection: CmsCollection = {
  name: "pages",
  label: "Pages",
  editor: {
    preview: false,
  },
  files: [
    LandingPage,
    TeamPage,
    LegalPage,
    BusinessPage,
    CoachingPage,
    LeadingPage,
    CommunityPage,
  ],
};

export default PageCollection;
