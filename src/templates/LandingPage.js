import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { Container } from "@material-ui/core";

import { dataFormatter } from "src/util";
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
  aboutImage,
  testimonials,
  products,
  videos,
}) => {
  return (
    <>
      <Hero hero={hero} />
      {/* <Events />
      <About about={about} image={aboutImage} />
      <Testimonials testimonials={testimonials} />
      <Services />
      <Products products={products} />
      <Videos videos={videos} /> */}
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
  const data = dataFormatter(props.data.allMarkdownRemark.nodes);
  return (
    <Layout>
      <Navbar page="LandingPage" />
      <main>
        <LandingPage {...data.pages.LandingPage} />
      </main>
      <Footer {...data.information.contact} />
    </Layout>
  );
};

export default LandingPageLoader;

export const pageQuery = graphql`
  query LandingPageQuery {
    allMarkdownRemark {
      nodes {
        frontmatter {
          information {
            contact {
              address
              email
              link
              phone1
              phone2
              title
            }
          }
          pages {
            LandingPage {
              hero {
                title
                image
              }
              about {
                text
                image
              }
              products {
                description
                image
                title
              }
              testimonials {
                author
                role
                testimonial
              }
              title
              titleColor
              videos {
                video
                title
                link
              }
            }
          }
        }
      }
    }
  }
`;
