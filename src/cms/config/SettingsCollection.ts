import { CmsCollection, CmsField } from "netlify-cms-core";

const commonFields = (key: string, collection = "settings"): CmsField[] => [
  {
    label: "Collection",
    name: "collection",
    widget: "hidden",
    default: collection,
  },
  {
    label: "Key",
    name: "key",
    widget: "hidden",
    default: key,
  },
];

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
        ...commonFields("navigation"),
        {
          label: "Links",
          name: "links",
          widget: "list",
          allow_add: false,
          collapsed: false,
          fields: [
            {
              label: "Label",
              name: "label",
              widget: "string",
            },
            {
              label: "Relative URL",
              name: "url",
              widget: "string",
            },
            {
              label: "Tooltip",
              name: "description",
              widget: "string",
              required: false,
            },
          ],
        },
      ],
    },
    {
      file: "src/collections/settings/contact/index.md",
      label: "Contact Information",
      name: "contact",
      fields: [
        ...commonFields("contact"),
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
        {
          label: "Address",
          name: "address",
          widget: "text",
          required: false,
        },
      ],
    },
    {
      file: "src/collections/settings/general-settings/index.md",
      label: "General",
      name: "generalSettings",
      fields: [
        ...commonFields("generalSettings"),
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
