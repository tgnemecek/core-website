import { CmsCollection } from "netlify-cms-core";
import { NavigationLink, Contact, GeneralSettings } from "types";
import generateCmsSection from "./generate-cms-section";
import generateCmsField from "./generate-cms-field";

const SettingsCollection: CmsCollection = {
  name: "settings",
  label: "Settings",
  editor: {
    preview: false,
  },
  files: [
    {
      file: "src/collections/settings/navigation/index.md",
      label: "Navigation",
      name: "navigation",
      fields: [
        generateCmsSection<NavigationLink>({
          label: "Links",
          name: "links",
          widget: "list",
          allow_add: false,
          collapsed: false,
          properties: {
            label: {
              label: "Label",
              widget: "string",
            },
            url: {
              label: "Relative URL",
              widget: "string",
            },
            description: {
              label: "Tooltip",
              widget: "string",
              required: false,
            },
          },
        }),
      ],
    },
    {
      file: "src/collections/settings/contact/index.md",
      label: "Contact Information",
      name: "contact",
      fields: [
        generateCmsField<Contact["address"]>({
          label: "Address",
          name: "address",
          widget: "text",
          required: false,
        }),
        generateCmsField<Contact["email"]>({
          label: "Email",
          name: "email",
          widget: "string",
          required: false,
        }),
        generateCmsField<Contact["phone1"]>({
          label: "Phone 1",
          name: "phone1",
          widget: "string",
          required: false,
        }),
        generateCmsField<Contact["phone2"]>({
          label: "Phone 2",
          name: "phone2",
          widget: "string",
          required: false,
        }),
        generateCmsField<Contact["link"]>({
          label: "External Link",
          name: "link",
          widget: "string",
          required: false,
        }),
      ],
    },
    {
      file: "src/collections/settings/general-settings/index.md",
      label: "General",
      name: "generalSettings",
      fields: [
        generateCmsField<GeneralSettings["logo"]>({
          label: "Logo Image",
          name: "logo",
          widget: "image",
        }),
        generateCmsField<GeneralSettings["heroImage"]>({
          label: "Hero Image",
          name: "heroImage",
          widget: "image",
        }),
        generateCmsField<GeneralSettings["heroImage"]>({
          label: "Refund Policy",
          name: "refundPolicy",
          widget: "text",
        }),
      ],
    },
  ],
};

export default SettingsCollection;
