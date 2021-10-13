import React from "react";
import { graphql } from "gatsby";
import { Typography, Container } from "@material-ui/core";
import { Hero, Heading, Layout, Navbar, Section, Footer } from "components";
import { LegalPageDTO } from "types";

const LegalPage: React.FC<LegalPageDTO> = ({
  data: {
    markdownRemark: {
      frontmatter: {
        pages: {
          legal: { privacyPolicy, termsAndConditions },
        },
      },
    },
  },
}) => {
  return (
    <Layout>
      <Navbar />
      <main>
        <Hero small hideTitle />
      </main>
      <Section id="privacy-policy">
        <Container>
          <Heading>Privacy Policy</Heading>
          <Typography variant="body1">{privacyPolicy}</Typography>
        </Container>
      </Section>
      <Section id="terms-and-conditions">
        <Container>
          <Heading>Terms &amp; Conditions</Heading>
          <Typography variant="body1">{termsAndConditions}</Typography>
        </Container>
      </Section>
      <Footer />
    </Layout>
  );
};

export default LegalPage;

export const pageQuery = graphql`
  query LegalPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        pages {
          legal {
            privacyPolicy
            termsAndConditions
          }
        }
      }
    }
  }
`;
