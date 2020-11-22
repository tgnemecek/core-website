import React from "react";
import { graphql } from "gatsby";

import { Hero, Team, Layout, Navbar, Footer } from "components";

const TeamPage: React.FC<any> = ({ hero, members }) => {
  return (
    <>
      <Hero hero={hero} small />
      <Team members={members} />
    </>
  );
};

const TeamPageLoader: React.FC<any> = (props) => {
  const team = props.data.team.nodes[0].frontmatter.pages.team;

  return (
    <Layout>
      <Navbar />
      <main>
        <TeamPage {...team} />
      </main>
      <Footer />
    </Layout>
  );
};

export default TeamPageLoader;

export const pageQuery = graphql`
  query TeamPageQuery {
    team: allMarkdownRemark(filter: { frontmatter: { key: { eq: "team" } } }) {
      nodes {
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
  }
`;
