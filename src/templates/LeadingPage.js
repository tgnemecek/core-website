import React from "react";
import { graphql } from "gatsby";
import leadingReport from "src/downloads/free-reports/leading.pdf";
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

const LeadingPage = ({ hero, benefits, explanation, email }) => {
  return (
    <>
      <Hero hero={hero} small={true} />
      <Section>
        <Explanation explanation={explanation} />
        <FreeReport
          reportText="Get your Free Personal Report!"
          downloadLink={leadingReport}
        />
        <Benefits benefits={benefits} />
        <CallToAction text="Send Us a Message" href={`mailto:${email}`} />
      </Section>
      <Section>
        <PayPalButtons
          buttonTypes={["leaderStrengths", "entrepreneuerStrengths"]}
        />
      </Section>
    </>
  );
};

const LeadingPageLoader = (props) => {
  const leading = props.data.main.nodes[0].frontmatter.pages.leading;

  return (
    <Layout>
      <Navbar />
      <main>
        <LeadingPage {...leading} email={getContactEmail()} />
      </main>
      <Footer />
    </Layout>
  );
};

export default LeadingPageLoader;

export const pageQuery = graphql`
  query LeadingPageQuery {
    main: allMarkdownRemark(
      filter: { frontmatter: { key: { eq: "leading" } } }
    ) {
      nodes {
        frontmatter {
          pages {
            leading {
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
