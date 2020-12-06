import React from "react";
import { graphql } from "gatsby";
import leadingReport from "src/downloads/free-reports/leading.pdf";
import { ServicesPageDTO } from "types";

import {
  Hero,
  Section,
  ServiceExplanation,
  ServiceBenefits,
  CallToAction,
  FreeReport,
  PayPalButtons,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";

const LeadingPage: React.FC<ServicesPageDTO> = ({
  data: {
    markdownRemark: {
      frontmatter: {
        pages: { leading },
      },
    },
  },
}) => {
  const { hero, benefits, explanation } = leading;
  return (
    <Layout>
      <Navbar />
      <main>
        <Hero hero={hero} small />
        <Section>
          <ServiceExplanation explanation={explanation} />
          <FreeReport
            reportText="Get a Free Leader Compass Report!"
            downloadLink={leadingReport}
          />
          <ServiceBenefits
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
      </main>
      <Footer />
    </Layout>
  );
};

export default LeadingPage;

export const pageQuery = graphql`
  query LeadingPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
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
`;
