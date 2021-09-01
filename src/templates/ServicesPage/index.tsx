import React from "react";
import { graphql } from "gatsby";
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
