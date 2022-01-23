import React from "react";
import { graphql } from "gatsby";
import { ServicePageDTO, ServiceName } from "types";
import { recursivelyFormatDate } from "utils";
import {
  Hero,
  Section,
  ContactUsSection,
  Layout,
  Navbar,
  Footer,
} from "components";

import {
  Benefits,
  CallToAction,
  Explanation,
  FreeReport,
  PayPalButtons,
} from "./sections";

const ServicePage: React.FC<ServicePageDTO> = ({
  data: {
    markdownRemark: {
      fields: { slug },
      frontmatter: {
        pages: { ServicePage },
      },
    },
  },
}) => {
  const { benefits, explanation, title } = recursivelyFormatDate(ServicePage);

  const service = slug.replace(/\//g, "") as ServiceName;

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero title={title} small={true} />
        <Section>
          <Explanation explanation={explanation} />
          <FreeReport service={service} />
          <Benefits benefits={benefits} />
          <CallToAction targetId="contact-form" text="Send Us a message" />
        </Section>
        <Section>
          <PayPalButtons service={service} />
        </Section>
        <ContactUsSection />
      </main>
      <Footer />
    </Layout>
  );
};

export default ServicePage;

export const pageQuery = graphql`
  query ServicePageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        pages {
          ServicePage {
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
