import React from "react";
import { graphql } from "gatsby";
import learningReport from "src/downloads/free-reports/learning.pdf";
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

const LearningPage: React.FC<any> = ({
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
          reportText="Get a Free Report to Improve Learning!"
          downloadLink={learningReport}
        />
        <Benefits benefits={benefits} title="Schedule a time with us if you:" />
        <CallToAction href="#contact-form" text="Send Us a message" />
      </Section>
      <Section>
        <PayPalButtons buttonTypes={["personalStrengths", "donation"]} />
      </Section>
      <ContactForm />
    </>
  );
};

const LearningPageLoader: React.FC<any> = (props) => {
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
