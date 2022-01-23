import { CmsCollectionFile } from "netlify-cms-core";
import {
  About,
  PostsSection as PostsSectionType,
  Service,
  Testimonial,
  Video,
} from "types";
import generateCmsSection from "../generate-cms-section";

const AboutSection = generateCmsSection<About>({
  label: "About Section",
  name: "about",
  widget: "list",
  properties: {
    heading: {
      label: "Heading",
      widget: "text",
    },
    text: {
      label: "Body",
      widget: "text",
    },
    optional: {
      label: "Optional",
      widget: "text",
      required: false,
    },
  },
});

const PostsSection = generateCmsSection<PostsSectionType>({
  label: "Posts Section",
  name: "posts",
  widget: "object",
  properties: {
    heading: {
      label: "Heading",
      widget: "string",
    },
    subHeading: {
      label: "Subheading",
      widget: "string",
    },
  },
});

const ServicesSection = generateCmsSection<Service>({
  label: "Services Section",
  name: "services",
  widget: "list",
  allow_add: false,
  collapsed: false,
  properties: {
    title: {
      label: "Title",
      widget: "string",
    },
    description: {
      label: "Short Description",
      widget: "text",
    },
    image: {
      label: "Image",
      widget: "image",
    },
    name: {
      label: "Name",
      widget: "string",
    },
  },
});

const TestimonialsSection = generateCmsSection<Testimonial>({
  label: "Testimonials Section",
  name: "testimonials",
  widget: "list",
  collapsed: false,
  properties: {
    testimonial: {
      label: "Testimonial",
      widget: "text",
    },
    author: {
      label: "Author",
      widget: "string",
    },
    role: {
      label: "Role",
      widget: "string",
    },
  },
});

const VideosSection = generateCmsSection<Video>({
  label: "Videos Section",
  name: "videos",
  widget: "list",
  collapsed: false,
  properties: {
    title: {
      label: "Video Title",
      widget: "string",
    },
    subtitle: {
      label: "Video Subtitle",
      widget: "string",
      required: false,
    },
    link: {
      label: "Video Link",
      widget: "string",
    },
  },
});

const LandingPage: CmsCollectionFile = {
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
    AboutSection,
    PostsSection,
    ServicesSection,
    TestimonialsSection,
    VideosSection,
  ],
};

export default LandingPage;
