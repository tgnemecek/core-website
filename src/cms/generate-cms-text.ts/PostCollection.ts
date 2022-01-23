import { CmsCollection } from "netlify-cms-core";
import { PostPage } from "types";
import generateCmsField from "./generate-cms-field";

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
    generateCmsField<PostPage["collection"]>({
      label: "Collection",
      name: "collection",
      widget: "hidden",
      default: "posts",
    }),
    generateCmsField<PostPage["title"]>({
      label: "Title",
      name: "title",
      widget: "string",
      pattern: ["^.{3,80}$", "Must have between 3 and 80 characters"],
    }),
    generateCmsField<PostPage["text"]>({
      label: "Text",
      name: "text",
      widget: "markdown",
    }),
    generateCmsField<PostPage["image"]>({
      label: "Image",
      name: "image",
      widget: "image",
      required: false,
    }),
    generateCmsField<PostPage["video"]>({
      label: "Video",
      name: "video",
      widget: "string",
      required: false,
    }),
    generateCmsField<PostPage["date"]>({
      label: "",
      name: "date",
      widget: "currentDate",
      required: true,
      index_file: "",
      meta: false,
    }),
  ],
};

export default PostCollection;
