import React from "react";
import { graphql } from "gatsby";
import { Hero, ContactUsSection, Layout, Navbar, Footer } from "components";
import { TeamPageDTO } from "types";
import { recursivelyFormatDate } from "utils";
import Team from "./Team";

const TeamPage: React.FC<TeamPageDTO> = ({
  data: {
    markdownRemark: {
      fields: { TeamPage },
    },
  },
}) => {
  const { title, subtitle, members } = recursivelyFormatDate(TeamPage);

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero title={title} small />
        <Team subtitle={subtitle} members={members} />
        <ContactUsSection />
      </main>
      <Footer />
    </Layout>
  );
};

export default TeamPage;

export const pageQuery = graphql`
  query TeamPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        TeamPage {
          title
          subtitle
          members {
            name
            role
            photo
            video
            bio
            linkedin
          }
        }
      }
    }
  }
`;
