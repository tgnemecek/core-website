import { CmsCollection } from "netlify-cms-core";
import LandingPage from "./LandingPage";
import TeamPage from "./TeamPage";
import LegalPage from "./LegalPage";
import CoachingPage from "./CoachingPage";
import LeadingPage from "./LeadingPage";
import LearningPage from "./LearningPage";

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
    CoachingPage,
    LeadingPage,
    LearningPage,
  ],
};

export default PageCollection;
