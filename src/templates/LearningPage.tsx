import React from "react";
import learningReport from "src/downloads/free-reports/learning.pdf";
import { useLearningPage } from "utils";

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

const LearningPage: React.FC = () => {
  const { hero, benefits, explanation } = useLearningPage();
  return (
    <Layout>
      <Navbar />
      <main>
        <Hero hero={hero} small={true} />
        <Section>
          <Explanation explanation={explanation} />
          <FreeReport
            reportText="Get a Free Report to Improve Learning!"
            downloadLink={learningReport}
          />
          <Benefits
            benefits={benefits}
            title="Schedule a time with us if you:"
          />
          <CallToAction href="#contact-form" text="Send Us a message" />
        </Section>
        <Section>
          <PayPalButtons buttonTypes={["personalStrengths", "donation"]} />
        </Section>
        <ContactForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default LearningPage;
