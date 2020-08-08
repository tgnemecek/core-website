import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { Container } from "@material-ui/core";

import { formatPagesQuery } from "src/util";
import Hero from "components/Hero";
import Events from "components/Events";
import About from "components/About";
import Testimonials from "components/Testimonials";
import Services from "components/Services";
import Products from "components/Products";
import Videos from "components/Videos";
import Layout from "components/Layout";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

const LandingPage = ({
  hero,
  about,
  testimonials,
  services,
  products,
  videos,
}) => {
  return (
    <>
      <Hero hero={hero} />
      <Events />
      <About about={about} />
      <Testimonials testimonials={testimonials} />
      <Services services={services} />
      <Products products={products} />
      <Videos videos={videos} />
    </>
  );
};

// LandingPage.propTypes = {
//   main: {
//     about: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired
//   },
// };

const LandingPageLoader = (props) => {
  const landing = props.data.landing.nodes[0].frontmatter.pages.landing;
  const contact = props.data.contact.nodes[0].frontmatter.information.contact;

  const pages = formatPagesQuery(props.data.pages.nodes);

  return (
    <Layout>
      <Navbar page="LandingPage" pages={pages} />
      <main>
        <LandingPage {...landing} />
      </main>
      <Footer {...contact} />
    </Layout>
  );
};

export default LandingPageLoader;

export const pageQuery = graphql`
  query LandingPageQuery {
    landing: allMarkdownRemark(
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
              }
              videos {
                title
                link
              }
            }
          }
        }
      }
    }
    pages: allMarkdownRemark(
      filter: { frontmatter: { collection: { eq: "pages" } } }
    ) {
      nodes {
        frontmatter {
          pages {
            coaching {
              title
            }
            leading {
              title
            }
            learning {
              title
            }
          }
        }
      }
    }
    contact: allMarkdownRemark(
      filter: { frontmatter: { key: { eq: "contact" } } }
    ) {
      nodes {
        frontmatter {
          information {
            contact {
              email
              link
              address
              phone1
              phone2
              title
            }
          }
        }
      }
    }
  }
`;
