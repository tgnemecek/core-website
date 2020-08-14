import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Hero from "components/Hero";
import Team from "components/Team";
import Layout from "components/Layout";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

const TeamPage = ({ hero }) => {
  return (
    <>
      <Hero hero={hero} small={true} />
      <Team />
    </>
  );
};

// TeamPage.propTypes = {
//   main: {
//     about: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired
//   },
// };

const TeamPageLoader = (props) => {
  const team = props.data.team.nodes[0].frontmatter.pages.team;
  const contact = props.data.contact.nodes[0].frontmatter.information.contact;
  const pages =
    props.data.pages.nodes[0].frontmatter.information.navigation.links;

  return (
    <Layout>
      <Navbar path={props.path} pages={pages} />
      <main>
        <TeamPage {...team} />
      </main>
      <Footer {...contact} />
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
            }
          }
        }
      }
    }
    pages: allMarkdownRemark(
      filter: { frontmatter: { key: { eq: "navigation" } } }
    ) {
      nodes {
        frontmatter {
          information {
            navigation {
              links {
                label
                url
              }
            }
          }
        }
      }
    }
    contact: allMarkdownRemark(
      filter: { frontmatter: { key: { eq: "contact" } } }
    ) {
      nodes {
        frontmatter {
          information {
            contact {
              email
              link
              address
              phone1
              phone2
              title
            }
          }
        }
      }
    }
  }
`;
