import React from "react";
import { graphql } from "gatsby";
import leadingReport from "src/downloads/free-reports/leading.pdf";
import coachingReport from "src/downloads/free-reports/coaching.pdf";
import learningReport from "src/downloads/free-reports/learning.pdf";
import { ServicesPageDTO, ServiceNameType, PayPalButtonName } from "types";

import { Hero, Section, ContactForm, Layout, Navbar, Footer } from "components";

import {
  Benefits,
  CallToAction,
  Explanation,
  FreeReport,
  PayPalButtons,
} from "./sections";

const ServicesPage: React.FC<ServicesPageDTO> = ({
  data: {
    markdownRemark: {
      fields: { slug },
      frontmatter: {
        pages: { services },
      },
    },
  },
}) => {
  const { hero, benefits, explanation } = services;

  const service = slug.replace(/\//g, "") as ServiceNameType;

  const getReportText = () => {
    switch (service) {
      case "leading":
      case "coaching":
        return "Get a Free Leader Compass Report!";
      case "learning":
        return "Get a Free Report to Improve Learning!";
      default:
        throw new Error(
          `Service name unrecognized in getReportText(): ${service}`
        );
    }
  };

  const getReportLink = () => {
    switch (service) {
      case "leading":
        return leadingReport;
      case "coaching":
        return coachingReport;
      case "learning":
        return learningReport;
      default:
        throw new Error(
          `Service name unrecognized in getReportLink(): ${service}`
        );
    }
  };

  const getPayPalButtons = (): PayPalButtonName[] => {
    switch (service) {
      case "leading":
        return ["leaderStrengths", "entrepreneuerStrengths"];
      case "coaching":
        return ["careerStrengths", "personalStrengths"];
      case "learning":
        return ["personalStrengths", "donation"];
      default:
        throw new Error(
          `Service name unrecognized in getPayPalButtons(): ${service}`
        );
    }
  };

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero hero={hero} small={true} />
        <Section>
          <Explanation explanation={explanation} />
          <FreeReport
            reportText={getReportText()}
            downloadLink={getReportLink()}
          />
          <Benefits benefits={benefits} />
          <CallToAction href="#contact-form" text="Send Us a message" />
        </Section>
        <Section>
          <PayPalButtons buttonTypes={getPayPalButtons()} />
        </Section>
        <ContactForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default ServicesPage;

export const pageQuery = graphql`
  query ServicesPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      frontmatter {
        pages {
          services {
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
