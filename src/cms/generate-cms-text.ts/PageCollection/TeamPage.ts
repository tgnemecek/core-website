import { CmsCollectionFile } from "netlify-cms-core";
import { Member } from "types";
import getStaticPageFields from "../get-static-page-fields";
import generateCmsSection from "../generate-cms-section";

const MembersSection = generateCmsSection<Member>({
  label: "Members",
  name: "members",
  widget: "list",
  allow_add: true,
  collapsed: false,
  properties: {
    name: {
      label: "Name",
      widget: "string",
    },
    role: {
      label: "Role",
      widget: "string",
    },
    photo: {
      label: "Photo",
      widget: "image",
    },
    video: {
      label: "Video",
      widget: "string",
      required: false,
    },
    bio: {
      label: "Bio",
      widget: "text",
    },
    linkedin: {
      label: "LinkedIn Link",
      widget: "string",
      required: false,
    },
  },
});

const TeamPage: CmsCollectionFile = {
  file: "src/collections/pages/team.md",
  label: "Team Page",
  name: "team",
  fields: [
    ...getStaticPageFields("team", "TeamPage"),
    {
      label: "Members",
      name: "members",
      widget: "list",
      allow_add: true,
      collapsed: false,
      fields: [MembersSection],
    },
  ],
};

export default TeamPage;
