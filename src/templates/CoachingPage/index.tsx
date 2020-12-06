import React from "react";
import { graphql } from "gatsby";
import coachingReport from "src/downloads/free-reports/coaching.pdf";
import { ServicesPageDTO } from "types";
import {
  Hero,
  Section,
  ServiceExplanation,
  ServiceBenefits,
  FreeReport,
  CallToAction,
  PayPalButtons,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";

const CoachingPage: React.FC<ServicesPageDTO> = ({
  data: {
    markdownRemark: {
      frontmatter: {
        pages: { coaching },
      },
    },
  },
}) => {
  const { hero, benefits, explanation } = coaching;

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero hero={hero} small />
        <Section>
          <ServiceExplanation explanation={explanation} />
          <FreeReport
            reportText="Get a Free Career Compass Report!"
            downloadLink={coachingReport}
          />
          <ServiceBenefits
            benefits={benefits}
            title="Schedule a time with us if you:"
          />
          <CallToAction text="Send Us a Message" href="#contact-form" />
        </Section>
        <Section>
          <PayPalButtons
            buttonTypes={["careerStrengths", "personalStrengths"]}
          />
        </Section>
        <ContactForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default CoachingPage;

export const pageQuery = graphql`
  query CoachingPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
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
`;
