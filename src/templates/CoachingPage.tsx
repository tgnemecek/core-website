import React from "react";
import coachingReport from "src/downloads/free-reports/coaching.pdf";
import { useCoachingPage } from "utils";
import {
  Hero,
  Section,
  Explanation,
  Benefits,
  FreeReport,
  CallToAction,
  PayPalButtons,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";

const CoachingPage: React.FC = () => {
  const { hero, benefits, explanation } = useCoachingPage();

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero hero={hero} small />
        <Section>
          <Explanation explanation={explanation} />
          <FreeReport
            reportText="Get a Free Career Compass Report!"
            downloadLink={coachingReport}
          />
          <Benefits
            benefits={benefits}
            title="Schedule a time with us if you:"
          />
          <CallToAction text="Send Us a Message" href="#contact-form" />
        </Section>
        <Section>
          <PayPalButtons
            buttonTypes={["careerStrengths", "personalStrengths"]}
          />
        </Section>
        <ContactForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default CoachingPage;
