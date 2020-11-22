import React from "react";
import { graphql } from "gatsby";
import { getContactEmail } from "utils";

import {
  About,
  Testimonials,
  Products,
  Videos,
  Hero,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";

const LandingPage: React.FC<any> = ({
  hero,
  about,
  testimonials,
  products,
  videos,
}) => {
  return (
    <>
      <Hero hero={hero} />
      <About about={about} />
      <Testimonials testimonials={testimonials} />
      <Products products={products} />
      <Videos videos={videos} />
      <ContactForm />
    </>
  );
};

const LandingPageLoader: React.FC<any> = (props) => {
  const landing = props.data.main.nodes[0].frontmatter.pages.landing;

  return (
    <Layout>
      <Navbar />
      <main>
        <LandingPage {...landing} email={getContactEmail()} />
      </main>
      <Footer />
    </Layout>
  );
};

export default LandingPageLoader;

export const pageQuery = graphql`
  query LandingPageQuery {
    main: allMarkdownRemark(
      filter: { frontmatter: { key: { eq: "landing" } } }
    ) {
      nodes {
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
  }
`;
