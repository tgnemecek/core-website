import React from "react";
import { graphql } from "gatsby";
import learningReport from "src/downloads/free-reports/learning.pdf";
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

const LearningPage: React.FC<ServicesPageDTO> = ({
  data: {
    markdownRemark: {
      frontmatter: {
        pages: { learning },
      },
    },
  },
}) => {
  const { hero, benefits, explanation } = learning;
  return (
    <Layout>
      <Navbar />
      <main>
        <Hero hero={hero} small={true} />
        <Section>
          <ServiceExplanation explanation={explanation} />
          <FreeReport
            reportText="Get a Free Report to Improve Learning!"
            downloadLink={learningReport}
          />
          <ServiceBenefits
            benefits={benefits}
            title="Schedule a time with us if you:"
          />
          <CallToAction href="#contact-form" text="Send Us a message" />
        </Section>
        <Section>
          <PayPalButtons buttonTypes={["personalStrengths", "donation"]} />
        </Section>
        <ContactForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default LearningPage;

export const pageQuery = graphql`
  query LearningPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
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
`;
