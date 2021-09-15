import React from "react";
import paypalBuyNow from "src/img/paypal-buy-now.jpg";
import paypalDonate from "src/img/paypal-donate.jpg";
import { PayPalButtonName, ServiceName } from "types";
import { useContactInfo } from "utils";

type ButtonData = {
  label: string;
  description: React.ReactNode;
  value?: string;
  price?: number;
  button?: "*jpg";
};

type Buttons = Record<PayPalButtonName, ButtonData>;

const usePayPalButtons = (service: ServiceName) => {
  const { phone1 } = useContactInfo();

  const formattedPhone = phone1.replace(/[^\d\+]/g, "");

  const getButtonNames = (): PayPalButtonName[] => {
    switch (service) {
      case "leading":
        return ["leaderStrengths", "entrepreneurStrengths"];
      case "coaching":
        return ["careerStrengths", "personalStrengths"];
      case "learning":
        return ["personalStrengths", "donation"];
      case "business":
        return ["leaderStrengths", "organizationAndTeamProfiles"];
      default:
        throw new Error(
          `Service name unrecognized in getPayPalButtons(): ${service}`
        );
    }
  };

  const buttons: Buttons = {
    careerStrengths: {
      label: "Career Strengths Scale",
      description:
        "If you're thinking about changing your career, take this Individualized Career Strengths Report to discover your strengths and weaknesses in 6 key success factors--and get practical suggestions for how to quickly improve each one.",
      value: "RLJD2JRPKQ2H2",
      price: 24,
      button: paypalBuyNow,
    },
    leaderStrengths: {
      label: "Leader Strengths Scale",
      description:
        "To improve your leadership skills in these challenging times, take the Leadership Strengths Scale to discover your personal AND professional strengths and weaknesses among 6 key success factors. You'll also receive practical tips for rapid improvement.",
      value: "AXSRW3XF4FKR8",
      price: 49,
      button: paypalBuyNow,
    },
    entrepreneurStrengths: {
      label: "Entrepreneur Strengths Scale",
      description:
        "If you want to start and lead your own business, the Entrepreneur Strengths Scale will reveal your strengths and weaknesses in 6 key factors--plus provide valuable tips to increase your odds of a successful launch.",
      value: "Z86XSVPCFP6H6",
      price: 24,
      button: paypalBuyNow,
    },
    personalStrengths: {
      label: "Personal Strengths Scale",
      description:
        "If you’re in a stressful life transition, take this Individualized Personal Strengths Scale to discover your strengths and weaknesses in 6 key life-success factors. You'll also get practical suggestions for how to improve each one.",
      value: "D2ZV5ASMDUXQG",
      price: 24,
      button: paypalBuyNow,
    },
    organizationAndTeamProfiles: {
      label: "Organization & Team Profiles",
      description: (
        <>
          <p>
            Assess where your business or teams are in balance or
            out-of-balance--why--and what you can do to implement sustainable
            improvements.
          </p>
          <a href={`tel:${formattedPhone}`}>
            Contact us for a free 1-hour consultation.
          </a>
        </>
      ),
    },
    donation: {
      label: "Make a Difference!",
      description:
        "Contribute to the efforts of Core Learning, a 501 c3 non-profit educational services organization, to bring The Balancing Act's transformational life/work skills training to at-risk youth and adults around the globe.",
      value: "JTFYEZ4SXFFW6",
      button: paypalDonate,
    },
  };

  return getButtonNames().map((key) => buttons[key]);
};

export default usePayPalButtons;
