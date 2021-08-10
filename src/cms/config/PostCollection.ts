import { CmsCollection } from "netlify-cms-core";

const PostCollection: CmsCollection = {
  name: "posts",
  label: "Posts",
  editor: {
    preview: false,
  },
  folder: "src/collections/posts",
  create: true,
  slug: "{{year}}-{{month}}-{{day}}-{{title}}",
  fields: [
    {
      label: "Collection",
      name: "collection",
      widget: "hidden",
      default: "posts",
    },
    {
      label: "Title",
      name: "title",
      widget: "string",
      pattern: ["^.{3,80}$", "Must have between 3 and 80 characters"],
    },
    {
      label: "Text",
      name: "text",
      widget: "markdown",
    },
    {
      label: "Image",
      name: "image",
      widget: "image",
      required: false,
    },
    {
      label: "Video",
      name: "video",
      widget: "string",
      required: false,
    },
    {
      label: "",
      name: "date",
      widget: "currentDate",
      required: true,
      index_file: "",
      meta: false,
    },
  ],
};

export default PostCollection;
