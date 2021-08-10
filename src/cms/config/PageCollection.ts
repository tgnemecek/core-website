import { CmsCollection, CmsField } from "netlify-cms-core";

const commonFields = (key: string, Component: string): CmsField[] => [
  {
    label: "Collection",
    name: "collection",
    widget: "hidden",
    default: "pages",
  },
  {
    label: "Key",
    name: "key",
    widget: "hidden",
    default: key,
  },
  {
    label: "Component",
    name: "component",
    widget: "hidden",
    default: Component,
  },
];

const PageCollection: CmsCollection = {
  name: "pages",
  label: "Pages",
  editor: {
    preview: false,
  },
  files: [
    {
      file: "src/collections/pages/index.md",
      label: "Landing Page",
      name: "index",
      fields: [
        ...commonFields("landing", "LandingPage"),
        {
          label: "About Section",
          name: "about",
          widget: "object",
          fields: [
            {
              label: "About Text",
              name: "text",
              widget: "text",
            },
            {
              label: "About Image",
              name: "image",
              widget: "image",
            },
          ],
        },
        {
          label: "Services Section",
          name: "services",
          widget: "list",
          allow_add: false,
          collapsed: false,
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Short Description",
              name: "description",
              widget: "text",
            },
            {
              label: "Image",
              name: "image",
              widget: "image",
            },
            {
              label: "Name",
              name: "name",
              widget: "hidden",
            },
          ],
        },
        {
          label: "Testimonials Section",
          name: "testimonials",
          widget: "list",
          collapsed: false,
          fields: [
            {
              label: "Testimonial",
              name: "testimonial",
              widget: "text",
            },
            {
              label: "Author",
              name: "author",
              widget: "string",
            },
            {
              label: "Role",
              name: "role",
              widget: "string",
            },
          ],
        },
        {
          label: "Products Section",
          name: "products",
          widget: "list",
          collapsed: false,
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Subtitle",
              name: "subtitle",
              widget: "string",
              required: false,
            },
            {
              label: "Description",
              name: "description",
              widget: "text",
            },
            {
              label: "Image",
              name: "image",
              widget: "image",
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
          label: "Videos Section",
          name: "videos",
          widget: "list",
          collapsed: false,
          fields: [
            {
              label: "Video Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Video Subtitle",
              name: "subtitle",
              widget: "string",
              required: false,
            },
            {
              label: "Video Link",
              name: "link",
              widget: "string",
            },
          ],
        },
      ],
    },
    {
      file: "src/collections/pages/team.md",
      label: "Team Page",
      name: "team",
      fields: [
        ...commonFields("team", "TeamPage"),
        {
          label: "Members",
          name: "members",
          widget: "list",
          allow_add: true,
          collapsed: false,
          fields: [
            {
              label: "Name",
              name: "name",
              widget: "string",
            },
            {
              label: "Role",
              name: "role",
              widget: "string",
            },
            {
              label: "Photo",
              name: "photo",
              widget: "image",
            },
            {
              label: "Video",
              name: "video",
              widget: "string",
              required: false,
            },
            {
              label: "Bio",
              name: "bio",
              widget: "text",
            },
            {
              label: "LinkedIn Link",
              name: "linkedin",
              widget: "string",
              required: false,
            },
          ],
        },
      ],
    },
    {
      file: "src/collections/pages/coaching.md",
      label: "Coaching Page",
      name: "coaching",
      fields: [
        ...commonFields("coaching", "CoachingPage"),
        {
          label: "Explanation",
          name: "explanation",
          widget: "object",
          fields: [
            {
              label: "Explanation Text",
              name: "text",
              widget: "markdown",
            },
            {
              label: "Explanation Image",
              name: "image",
              widget: "image",
            },
          ],
        },
        {
          label: "Benefits",
          name: "benefits",
          widget: "markdown",
        },
      ],
    },
    {
      file: "src/collections/pages/leading.md",
      label: "Leading Page",
      name: "leading",
      fields: [
        ...commonFields("leading", "LeadingPage"),
        {
          label: "Explanation",
          name: "explanation",
          widget: "object",
          fields: [
            {
              label: "Explanation Text",
              name: "text",
              widget: "markdown",
            },
            {
              label: "Explanation Image",
              name: "image",
              widget: "image",
            },
          ],
        },
        {
          label: "Benefits",
          name: "benefits",
          widget: "markdown",
        },
      ],
    },
    {
      file: "src/collections/pages/learning.md",
      label: "Learning Page",
      name: "learning",
      fields: [
        ...commonFields("learning", "LearningPage"),
        {
          label: "Explanation",
          name: "explanation",
          widget: "object",
          fields: [
            {
              label: "Explanation Text",
              name: "text",
              widget: "markdown",
            },
            {
              label: "Explanation Image",
              name: "image",
              widget: "image",
            },
          ],
        },
        {
          label: "Benefits",
          name: "benefits",
          widget: "markdown",
        },
      ],
    },
  ],
};

export default PageCollection;
