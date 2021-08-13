import React from "react";
import { graphql } from "gatsby";
import { LandingPageDTO } from "types";
import {
  Hero,
  EventFeed,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";
import { About, Testimonials, Services, Products, Videos } from "./sections";

const LandingPage: React.FC<LandingPageDTO> = ({
  data: {
    markdownRemark: {
      frontmatter: {
        pages: { landing },
      },
    },
  },
}) => {
  const { about, testimonials, products, services, videos } = landing;
  return (
    <Layout>
      <Navbar />
      <main>
<<<<<<< HEAD
        <Hero />
        <PostFeed title="What's new" />
=======
        <Hero hero={hero} />
>>>>>>> @{-1}
        <EventFeed title="Leading Your Life &amp; Work Events" />
        <About about={about} />
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
