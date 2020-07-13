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

const LandingPage = ({
  title,
  heroImage,
  invertTitleColor,
  about,
  aboutImage,
  testimonials,
  videos,
}) => {
  return (
    <>
      <Hero
        title={title}
        image={heroImage}
        invertTitleColor={invertTitleColor}
      />
      <Events />
      <About about={about} image={aboutImage} />
      <Testimonials testimonials={testimonials} />
      <Services />
      <Products />
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
  const data = dataFormatter(props.data);

  return (
    <Layout>
      <LandingPage {...data.main} />
    </Layout>
  );
};

export default LandingPageLoader;

export const pageQuery = graphql`
  query PageQuery {
    # Basic Page Data
    main: markdownRemark(frontmatter: { templateKey: { eq: "landing-page" } }) {
      frontmatter {
        title
        invertTitleColor
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        about
        aboutImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        testimonials {
          testimonial
          author
          role
        }
        videos {
          video
        }
      }
    }
  }
`;
