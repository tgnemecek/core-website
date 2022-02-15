import { CmsCollection } from "netlify-cms-core";

const SettingsCollection: CmsCollection = {
  name: "settings",
  label: "Settings",
  editor: {
    preview: false,
  },
  files: [
    {
      file: "src/collections/settings/navigation.md",
      label: "Navigation",
      name: "navigation",
      fields: [
        {
          label: "Links",
          name: "links",
          widget: "list",
          allow_add: false,
          collapsed: false,
          fields: [
            {
              label: "Label",
              widget: "string",
              name: "label",
            },
            {
              label: "Relative URL",
              widget: "string",
              name: "url",
            },
            {
              label: "Tooltip",
              widget: "string",
              name: "description",
              required: false,
            },
          ],
        },
      ],
    },
    {
      file: "src/collections/settings/contact.md",
      label: "Contact Information",
      name: "contact",
      fields: [
        {
          label: "Address",
          name: "address",
          widget: "text",
          required: false,
        },
        {
          label: "Email",
          name: "email",
          widget: "string",
          required: false,
        },
        {
          label: "Phone 1",
          name: "phone1",
          widget: "string",
          required: false,
        },
        {
          label: "Phone 2",
          name: "phone2",
          widget: "string",
          required: false,
        },
        {
          label: "External Link",
          name: "link",
          widget: "string",
          required: false,
        },
      ],
    },
    {
      file: "src/collections/settings/general.md",
      label: "General",
      name: "generalSettings",
      fields: [
        {
          label: "Logo Image",
          name: "logo",
          widget: "image",
        },
        {
          label: "Hero Image",
          name: "heroImage",
          widget: "image",
        },
        {
          label: "Refund Policy",
          name: "refundPolicy",
          widget: "text",
        },
      ],
    },
  ],
};

export default SettingsCollection;
