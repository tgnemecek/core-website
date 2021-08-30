import React from "react";
import { graphql } from "gatsby";
import { Hero, ContactForm, Layout, Navbar, Footer } from "components";
import { TeamPageDTO } from "types";
import { recursivelyFormatDate } from "utils";
import Team from "./Team";

const TeamPage: React.FC<TeamPageDTO> = ({
  data: {
    markdownRemark: {
      frontmatter: {
        pages: { team },
      },
    },
  },
}) => {
  const { title, members } = recursivelyFormatDate(team);

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero title={title} small />
        <Team members={members} />
        <ContactForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default TeamPage;

export const pageQuery = graphql`
  query TeamPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        pages {
          team {
            title
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
  }
`;
