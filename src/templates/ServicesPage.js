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

const ServicesPage = () => {
  return <div>SERVICES PAGE</div>;
};

const ServicesPageLoader = (props) => {
  return null;
  // const landing = props.data.landing.nodes[0].frontmatter.pages.landing;
  // const contact = props.data.contact.nodes[0].frontmatter.information.contact;
  // const pages =
  //   props.data.pages.nodes[0].frontmatter.information.navigation.links;

  // return (
  //   <Layout>
  //     <Navbar path={props.path} pages={pages} />
  //     <main>
  //       <ServicesPage {...landing} />
  //     </main>
  //     <Footer {...contact} />
  //   </Layout>
  // );
};

export default ServicesPageLoader;
