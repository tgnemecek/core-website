import React from "react";
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

const LandingPageLoader = (props) => {
  const landing = props.data.main.nodes[0].frontmatter.pages.landing;
  const contact = props.data.contact.nodes[0].frontmatter.information.contact;
  const pages =
    props.data.pages.nodes[0].frontmatter.information.navigation.links;

  return (
    <Layout>
      <Navbar path={props.path} pages={pages} />
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
      filter: { frontmatter: { key: { eq: "navigation" } } }
    ) {
      nodes {
        frontmatter {
          information {
            navigation {
              links {
                label
                url
              }
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
