import React from "react";
import { graphql } from "gatsby";
import leadingReport from "src/downloads/free-reports/leading.pdf";
import coachingReport from "src/downloads/free-reports/coaching.pdf";
import learningReport from "src/downloads/free-reports/learning.pdf";
import businessReport from "src/downloads/free-reports/business.pdf";
import { ServicesPageDTO, ServiceName } from "types";
import { recursivelyFormatDate } from "utils";
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
  const { benefits, explanation, title } = recursivelyFormatDate(services);

  const service = slug.replace(/\//g, "") as ServiceName;

  const getReportText = () => {
    switch (service) {
      case "leading":
      case "coaching":
      case "business":
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
      case "business":
        return businessReport;
      default:
        throw new Error(
          `Service name unrecognized in getReportLink(): ${service}`
        );
    }
  };

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero title={title} small={true} />
        <Section>
          <Explanation explanation={explanation} />
          <FreeReport
            reportText={getReportText()}
            downloadLink={getReportLink()}
          />
          <Benefits benefits={benefits} />
          <CallToAction targetId="contact-form" text="Send Us a message" />
        </Section>
        <Section>
          <PayPalButtons service={service} />
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
            title
            benefits
            explanation {
              text
              image
            }
          }
        }
      }
    }
  }
`;
