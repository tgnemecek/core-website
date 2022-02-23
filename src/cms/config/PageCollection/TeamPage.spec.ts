import assert from "assert";
import { TeamPage as TeamPageType, PickOnlyRequired } from "types";
import getStaticPageFields from "../get-static-page-fields";
import TeamPage from "./TeamPage";

type TeamPageRequiredOnly = PickOnlyRequired<TeamPageType>;

class TeamPageClass implements TeamPageRequiredOnly {
  title = "My Title";
  subtitle = "My subtitle";
  members = [
    {
      name: "Cool Name",
      role: "CEO",
      photo: "https://my-cool-photo.com",
      bio: "A bunch of text here telling my story",
    },
    {
      name: "Second person",
      role: "CTO",
      photo: "https://second-photo.com",
      bio: "A bunch of text here again",
    },
  ];
}

describe("#TeamPageCmsConfig", () => {
  it("has the correct number of fields", () => {
    const staticPageFields = getStaticPageFields("", "").length;
    const classFields = Object.keys(new TeamPageClass()).length;
    const expectedFields = staticPageFields + classFields;

    const pageFields = TeamPage.fields.length;

    assert.strictEqual(pageFields, expectedFields);
  });
});

export default TeamPage;
