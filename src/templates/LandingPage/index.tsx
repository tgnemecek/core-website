import React, { Suspense } from "react";
import { graphql } from "gatsby";
import { LandingPageDTO } from "types";
import {
  Hero,
  EventFeed,
  PostFeed,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";

const AboutSection = React.lazy(() => import("./sections/AboutSection"));
const Testimonials = React.lazy(() => import("./sections/Testimonials"));
const Services = React.lazy(() => import("./sections/Services"));
const Products = React.lazy(() => import("./sections/Products"));
const Videos = React.lazy(() => import("./sections/Videos"));

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
        <Hero />
        <PostFeed title="What's new" />
        <EventFeed title="Leading Your Life &amp; Work Events" />
        <Suspense fallback={<div>LOADING...</div>}>
          <AboutSection about={about} />
          <Testimonials testimonials={testimonials} />
          <Services services={services} />
          <Products products={products} />
          <Videos videos={videos} />
        </Suspense>
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
