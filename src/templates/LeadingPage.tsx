import React from "react";
import { graphql } from "gatsby";
import leadingReport from "src/downloads/free-reports/leading.pdf";
import { useLeadingPage } from "utils";

import {
  Hero,
  Section,
  Explanation,
  Benefits,
  CallToAction,
  FreeReport,
  PayPalButtons,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";

const LeadingPage: React.FC = () => {
  const { hero, benefits, explanation } = useLeadingPage();
  return (
    <Layout>
      <Navbar />
      <main>
        <Hero hero={hero} small />
        <Section>
          <Explanation explanation={explanation} />
          <FreeReport
            reportText="Get a Free Leader Compass Report!"
            downloadLink={leadingReport}
          />
          <Benefits
            benefits={benefits}
            title="Schedule a time with us if you are:"
          />
          <CallToAction href="#contact-form" text="Send Us a message" />
        </Section>
        <Section>
          <PayPalButtons
            buttonTypes={["leaderStrengths", "entrepreneuerStrengths"]}
          />
        </Section>
        <ContactForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default LeadingPage;
