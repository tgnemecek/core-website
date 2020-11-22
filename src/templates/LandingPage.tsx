import React from "react";
import { graphql } from "gatsby";
import { useLandingPage } from "utils";

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

const LandingPage: React.FC = () => {
  const { hero, about, testimonials, products, videos } = useLandingPage();
  return (
    <Layout>
      <Navbar />
      <main>
        <Hero hero={hero} />
        <About about={about} />
        <Testimonials testimonials={testimonials} />
        <Products products={products} />
        <Videos videos={videos} />
        <ContactForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default LandingPage;
