import React from "react";
import { graphql } from "gatsby";
import learningReport from "src/downloads/free-reports/learning.pdf";
import { getContactEmail } from "src/util";
import Hero from "components/Hero";
import Section from "components/Section";
import Explanation from "components/Explanation";
import Benefits from "components/Benefits";
import FreeReport from "components/FreeReport";
import CallToAction from "components/CallToAction";
import PayPalButtons from "components/PayPalButtons";

import Layout from "components/Layout";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

const LearningPage = ({ hero, benefits, explanation, email }) => {
  return (
    <>
      <Hero hero={hero} small={true} />
      <Section>
        <Explanation explanation={explanation} />
        <FreeReport
          reportText="Get a Free Report to Improve Learning!"
          downloadLink={learningReport}
        />
        <Benefits benefits={benefits} />
        <CallToAction text="Send Us a Message" href={`mailto:${email}`} />
      </Section>
      <Section>
        <PayPalButtons buttonTypes={["personalStrengths", "donation"]} />
      </Section>
    </>
  );
};

const LearningPageLoader = (props) => {
  const learning = props.data.main.nodes[0].frontmatter.pages.learning;

  return (
    <Layout>
      <Navbar />
      <main>
        <LearningPage {...learning} email={getContactEmail()} />
      </main>
      <Footer />
    </Layout>
  );
};

export default LearningPageLoader;

export const pageQuery = graphql`
  query LearningPageQuery {
    main: allMarkdownRemark(
      filter: { frontmatter: { key: { eq: "learning" } } }
    ) {
      nodes {
        frontmatter {
          pages {
            learning {
              benefits
              explanation {
                text
                image
              }
              hero {
                title
                image
              }
            }
          }
        }
      }
    }
  }
`;
