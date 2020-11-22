import React from "react";
import { graphql } from "gatsby";
import coachingReport from "src/downloads/free-reports/coaching.pdf";
import { getContactEmail } from "utils";
import {
  Hero,
  Section,
  Explanation,
  Benefits,
  FreeReport,
  CallToAction,
  PayPalButtons,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";

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
        <CallToAction text="Send Us a Message" href="#contact-form" />
      </Section>
      <Section>
        <PayPalButtons buttonTypes={["careerStrengths", "personalStrengths"]} />
      </Section>
      <ContactForm />
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
