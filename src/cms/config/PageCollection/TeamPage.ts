import { CmsCollectionFile, CmsFieldList } from "netlify-cms-core";
import { Member, TypeSafeCmsField } from "types";
import getStaticPageFields from "../get-static-page-fields";

const MembersSection: TypeSafeCmsField<Member, CmsFieldList> = {
  label: "Members",
  name: "members",
  widget: "list",
  allow_add: true,
  collapsed: false,
  fields: [
    {
      label: "Name",
      widget: "string",
      name: "name",
    },
    {
      label: "Role",
      widget: "string",
      name: "role",
    },
    {
      label: "Photo",
      widget: "image",
      name: "photo",
    },
    {
      label: "Video",
      widget: "string",
      name: "video",
      required: false,
    },
    {
      label: "Bio",
      widget: "text",
      name: "bio",
    },
    {
      label: "LinkedIn Link",
      widget: "string",
      name: "linkedin",
      required: false,
    },
  ],
};

const TeamPage: CmsCollectionFile = {
  file: "src/collections/pages/team.md",
  label: "Team Page",
  name: "team",
  fields: [...getStaticPageFields("team", "TeamPage"), MembersSection],
};

export default TeamPage;
