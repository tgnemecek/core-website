import React from "react";
import { graphql } from "gatsby";
import { LandingPageDTO } from "types";
import {
  HeroSection,
  EventFeed,
  PostFeed,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";
import {
  AboutSection,
  Testimonials,
  Services,
  Products,
  Videos,
} from "./sections";

const LandingPage: React.FC<LandingPageDTO> = ({
  data: {
    markdownRemark: {
      frontmatter: {
        pages: { landing },
      },
    },
  },
}) => {
  const { hero, about, testimonials, products, services, videos } = landing;
  return (
    <Layout>
      <Navbar />
      <main>
        <HeroSection hero={hero} />
        <PostFeed />
        <EventFeed title="Leading Your Life &amp; Work Events" />
        <AboutSection about={about} />
        <Testimonials testimonials={testimonials} />
        <Services services={services} />
        <Products products={products} />
        <Videos videos={videos} />
        <ContactForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default LandingPage;

export const pageQuery = graphql`
  query LandingPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        pages {
          landing {
            hero {
              title
              image
            }
            about {
              text
              image
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
            products {
              description
              image
              title
              subtitle
              link
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
  }
`;
