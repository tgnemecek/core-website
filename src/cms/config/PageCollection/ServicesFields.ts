import {
  CmsFieldObject,
  CmsFieldStringOrText,
  CmsFieldMarkdown,
} from "netlify-cms-core";
import { TypeSafeCmsField, ServicePage } from "types";

const Title: TypeSafeCmsField<ServicePage["title"], CmsFieldStringOrText> = {
  label: "Title",
  name: "title",
  widget: "string",
};

const Explanation: TypeSafeCmsField<ServicePage["title"], CmsFieldObject> = {
  label: "Explanation",
  name: "explanation",
  widget: "object",
  fields: [
    {
      label: "Explanation Text",
      widget: "markdown",
      name: "text",
    },
    {
      label: "Explanation Image",
      widget: "image",
      name: "image",
    },
  ],
};

const Benefits: TypeSafeCmsField<ServicePage["benefits"], CmsFieldMarkdown> = {
  label: "Benefits",
  name: "benefits",
  widget: "markdown",
};

const ServicesFields = [Title, Explanation, Benefits];

export default ServicesFields;
