import React from "react";
import { graphql } from "gatsby";
import coachingReport from "src/downloads/free-reports/coaching.pdf";
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

const CoachingPage: React.FC<any> = ({
  hero,
  benefits,
  explanation,
  email,
}) => {
  return (
    <>
      <Hero hero={hero} small={true} />
      <Section>
        <Explanation explanation={explanation} />
        <FreeReport
          reportText="Get a Free Career Compass Report!"
          downloadLink={coachingReport}
        />
        <Benefits benefits={benefits} title="Schedule a time with us if you:" />
        <CallToAction text="Send Us a Message" href={`mailto:${email}`} />
      </Section>
      <Section>
        <PayPalButtons buttonTypes={["careerStrengths", "personalStrengths"]} />
      </Section>
    </>
  );
};

const CoachingPageLoader: React.FC<any> = (props) => {
  const coaching = props.data.main.nodes[0].frontmatter.pages.coaching;

  return (
    <Layout>
      <Navbar />
      <main>
        <CoachingPage {...coaching} email={getContactEmail()} />
      </main>
      <Footer />
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
