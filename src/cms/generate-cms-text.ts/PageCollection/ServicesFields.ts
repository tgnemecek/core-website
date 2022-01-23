import { ServicesPage } from "types";
import generateCmsSection from "../generate-cms-section";
import generateCmsField from "../generate-cms-field";

const ExplanationSection = generateCmsSection<ServicesPage["explanation"]>({
  label: "Explanation",
  name: "explanation",
  widget: "object",
  properties: {
    text: {
      label: "Explanation Text",
      widget: "markdown",
    },
    image: {
      label: "Explanation Image",
      widget: "image",
    },
  },
});

const Benefits = generateCmsField<ServicesPage["benefits"]>({
  label: "Benefits",
  name: "benefits",
  widget: "markdown",
});

const ServicesFields = [ExplanationSection, Benefits];

export default ServicesFields;
