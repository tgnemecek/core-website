import React from "react";
import { graphql } from "gatsby";
import { Container } from "@material-ui/core";
import { ServicePageDTO, ServiceName } from "types";
import { recursivelyFormatDate } from "utils";
import {
  Hero,
  Section,
  Heading,
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
      fields: { slug, ServicePage },
    },
  },
}) => {
  const { benefits, explanation, title, subtitle } =
    recursivelyFormatDate(ServicePage);

  const service = slug.replace(/\//g, "") as ServiceName;

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero title={title} small={true} />
        <Section>
          <Container>
            <Heading showLine>{subtitle}</Heading>
          </Container>
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
        ServicePage {
          title
          subtitle
          benefits
          explanation {
            text
            image
          }
        }
      }
    }
  }
`;
