import React from "react";
import { graphql } from "gatsby";
import leadingReport from "src/downloads/free-reports/leading.pdf";
import { getContactEmail } from "utils";

import {
  Hero,
  Section,
  Explanation,
  Benefits,
  CallToAction,
  FreeReport,
  PayPalButtons,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";

const LeadingPage: React.FC<any> = ({ hero, benefits, explanation, email }) => {
  return (
    <>
      <Hero hero={hero} small />
      <Section>
        <Explanation explanation={explanation} />
        <FreeReport
          reportText="Get a Free Leader Compass Report!"
          downloadLink={leadingReport}
        />
        <Benefits
          benefits={benefits}
          title="Schedule a time with us if you are:"
        />
        <CallToAction href="#contact-form" text="Send Us a message" />
      </Section>
      <Section>
        <PayPalButtons
          buttonTypes={["leaderStrengths", "entrepreneuerStrengths"]}
        />
      </Section>
      <ContactForm />
    </>
  );
};

const LeadingPageLoader: React.FC<any> = (props) => {
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
