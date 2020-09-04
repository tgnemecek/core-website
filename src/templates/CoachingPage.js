import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { Container } from "@material-ui/core";

import Hero from "components/Hero";
import Section from "components/Section";
import Explanation from "components/Explanation";
import Benefits from "components/Benefits";
import Layout from "components/Layout";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

const CoachingPage = ({ hero, benefits, explanation }) => {
  return (
    <>
      <Hero hero={hero} small={true} />
      <Section>
        <Explanation explanation={explanation} />
        <Benefits benefits={benefits} />
      </Section>
    </>
  );
};

const CoachingPageLoader = (props) => {
  const coaching = props.data.main.nodes[0].frontmatter.pages.coaching;
  const contact = props.data.contact.nodes[0].frontmatter.information.contact;
  const pages =
    props.data.pages.nodes[0].frontmatter.information.navigation.links;

  return (
    <Layout>
      <Navbar path={props.path} pages={pages} />
      <main>
        <CoachingPage {...coaching} />
      </main>
      <Footer {...contact} />
    </Layout>
  );
};

export default CoachingPageLoader;

export const pageQuery = graphql`
  query CoachingPageQuery {
    main: allMarkdownRemark(
      filter: { frontmatter: { key: { eq: "coaching" } } }
    ) {
      nodes {
        frontmatter {
          pages {
            coaching {
              benefits
              explanation
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
