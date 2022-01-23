import React from "react";
import { graphql } from "gatsby";
import { LandingPageDTO } from "types";
import { recursivelyFormatDate } from "utils";
import {
  Hero,
  CoursesFeed,
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
  const { about, testimonials, products, services, videos } =
    recursivelyFormatDate(landing);

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero />
        <AboutSection about={about} />
        <PostFeed title="What's new" />
        <CoursesFeed />
        <EventFeed title="Upcoming Events" />
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
              heading
              text
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
