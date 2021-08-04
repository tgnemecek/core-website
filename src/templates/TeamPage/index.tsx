import React from "react";
import { graphql } from "gatsby";
import { HeroSection, ContactForm, Layout, Navbar, Footer } from "components";
import { TeamPageDTO } from "types";
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
  const { hero, members } = team;

  return (
    <Layout>
      <Navbar />
      <main>
        <HeroSection hero={hero} small />
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
            hero {
              title
              image
            }
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
