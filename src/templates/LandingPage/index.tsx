import React from "react";
import { graphql } from "gatsby";
import { LandingPageDTO } from "types";
import { recursivelyFormatDate } from "utils";
import {
  Hero,
  CoreLearningZoneSection,
  EventsSection,
  PostsSection,
  ContactUsSection,
  Layout,
  Navbar,
  Footer,
} from "components";
import {
  AboutSection,
  Testimonials,
  Services,
  ProductsSection,
  VideosSection,
} from "./sections";

const LandingPage: React.FC<LandingPageDTO> = ({
  data: {
    markdownRemark: {
      fields: { LandingPage },
    },
  },
}) => {
  const {
    aboutSection,
    coreLearningZoneSection,
    testimonials,
    productsSection,
    services,
    videos,
  } = recursivelyFormatDate(LandingPage);

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero title="Core Coaching &amp; Consulting" hideTitle />
        <AboutSection {...aboutSection} />
        <PostsSection />
        <CoreLearningZoneSection {...coreLearningZoneSection} />
        <EventsSection />
        <Testimonials testimonials={testimonials} />
        <Services services={services} />
        <ProductsSection {...productsSection} />
        <VideosSection videos={videos} />
        <ContactUsSection />
      </main>
      <Footer />
    </Layout>
  );
};

export default LandingPage;

export const pageQuery = graphql`
  query LandingPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        LandingPage {
          aboutSection {
            heading
            text
          }
          coreLearningZoneSection {
            heading
            subheading
          }
          testimonials {
            author
            role
            testimonial
          }
          services {
            title
            name
            description
            image
          }
          productsSection {
            heading
            subheading
            products {
              description
              image
              title
              subtitle
              link
            }
          }
          videos {
            title
            subtitle
            link
          }
        }
      }
    }
  }
`;
