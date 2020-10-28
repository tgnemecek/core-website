const config = {
  backend: {
    name: "git-gateway",
    branch: "master",
    commit_messages: {
      create: "Create {{collection}} “{{slug}}”",
      update: "Update {{collection}} “{{slug}}”",
      delete: "Delete {{collection}} “{{slug}}”",
      uploadMedia: "[skip ci] Upload “{{path}}”",
      deleteMedia: "[skip ci] Delete “{{path}}”",
    },
  },
  media_folder: "static/img",
  public_folder: "/img",
  media_library: {
    name: "cloudinary",
    config: {
      cloud_name: "core-coaching-consulting",
      api_key: 934769914928744,
    },
  },
  collections: [
    {
      name: "information",
      label: "Information",
      editor: {
        preview: false,
      },
      files: [
        {
          file: "src/collections/information/navigation/index.md",
          label: "Navigation",
          name: "navigation",
          fields: [
            {
              label: "Collection",
              name: "collection",
              widget: "hidden",
              default: "information",
            },
            {
              label: "Key",
              name: "key",
              widget: "hidden",
              default: "navigation",
            },
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
                },
              ],
            },
          ],
        },
        {
          file: "src/collections/information/contact/index.md",
          label: "Contact Information",
          name: "contact",
          fields: [
            {
              label: "Collection",
              name: "collection",
              widget: "hidden",
              default: "information",
            },
            {
              label: "Key",
              name: "key",
              widget: "hidden",
              default: "contact",
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
            {
              label: "Address",
              name: "address",
              widget: "text",
              required: false,
            },
          ],
        },
      ],
    },
    {
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
              default: "landing",
            },
            {
              label: "Component",
              name: "component",
              widget: "hidden",
              default: "LandingPage",
            },
            {
              label: "Hero Section",
              name: "hero",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "markdown",
                },
                {
                  label: "Hero Image",
                  name: "image",
                  widget: "image",
                },
              ],
            },
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
              default: "team",
            },
            {
              label: "Component",
              name: "component",
              widget: "hidden",
              default: "TeamPage",
            },
            {
              label: "Order",
              name: "order",
              widget: "hidden",
              default: 3,
            },
            {
              label: "Hero Section",
              name: "hero",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Hero Image",
                  name: "image",
                  widget: "image",
                },
              ],
            },
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
                  widget: "video",
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
              default: "coaching",
            },
            {
              label: "Component",
              name: "component",
              widget: "hidden",
              default: "CoachingPage",
            },
            {
              label: "Hero Section",
              name: "hero",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Hero Image",
                  name: "image",
                  widget: "image",
                },
              ],
            },
            {
              label: "Explanation",
              name: "explanation",
              widget: "object",
              fields: [
                {
                  label: "Explanation Text",
                  name: "text",
                  widget: "markdown",
                  buttons: ["link"],
                  editor_components: [],
                  modes: ["rich_text"],
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
              default: "leading",
            },
            {
              label: "Component",
              name: "component",
              widget: "hidden",
              default: "LeadingPage",
            },
            {
              label: "Hero Section",
              name: "hero",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Hero Image",
                  name: "image",
                  widget: "image",
                },
              ],
            },
            {
              label: "Explanation",
              name: "explanation",
              widget: "object",
              fields: [
                {
                  label: "Explanation Text",
                  name: "text",
                  widget: "markdown",
                  buttons: ["link"],
                  editor_components: [],
                  modes: ["rich_text"],
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
              default: "learning",
            },
            {
              label: "Component",
              name: "component",
              widget: "hidden",
              default: "LearningPage",
            },
            {
              label: "Hero Section",
              name: "hero",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Hero Image",
                  name: "image",
                  widget: "image",
                },
              ],
            },
            {
              label: "Explanation",
              name: "explanation",
              widget: "object",
              fields: [
                {
                  label: "Explanation Text",
                  name: "text",
                  widget: "markdown",
                  buttons: ["link"],
                  editor_components: [],
                  modes: ["rich_text"],
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
    },
  ],
};

export default config;
