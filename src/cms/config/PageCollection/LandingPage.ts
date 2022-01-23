import { CmsCollectionFile } from "netlify-cms-core";
import {
  AboutSection as AboutSectionType,
  PostsSection as PostsSectionType,
  CoreLearningZoneSection as CoreLearningZoneSectionType,
  EventsSection as EventsSectionType,
  Service,
  ProductsSection as ProductsSectionType,
  Testimonial,
  Video,
  ContactUsSection as ContactUsSectionType,
} from "types";
import generateCmsSection from "../generate-cms-section";

const AboutSection = generateCmsSection<AboutSectionType>({
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
    subheading: {
      label: "Subheading",
      widget: "string",
    },
  },
});

const CoreLearningZoneSection = generateCmsSection<CoreLearningZoneSectionType>(
  {
    label: "Core Learning Zone Section",
    name: "coreLearningZoneSection",
    widget: "object",
    properties: {
      heading: {
        label: "Heading",
        widget: "string",
      },
      subheading: {
        label: "Subheading",
        widget: "string",
      },
      extraText: {
        label: "Subheading",
        widget: "string",
        required: false,
      },
    },
  }
);

const EventsSection = generateCmsSection<EventsSectionType>({
  label: "Events Section",
  name: "eventsSection",
  widget: "object",
  properties: {
    heading: {
      label: "Heading",
      widget: "string",
    },
    subheading: {
      label: "Subheading",
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

const ProductsSection = generateCmsSection<ProductsSectionType>({
  label: "Products Section",
  name: "productsSection",
  widget: "object",
  properties: {
    heading: {
      label: "Heading",
      widget: "string",
    },
    subheading: {
      label: "Subheading",
      widget: "string",
    },
    products: generateCmsSection<ProductsSectionType["products"][number]>({
      label: "Products",
      name: "products",
      widget: "list",
      properties: {
        title: {
          label: "Title",
          widget: "string",
        },
        subtitle: {
          label: "Subtitle",
          widget: "string",
          required: false,
        },
        description: {
          label: "Description",
          widget: "string",
        },
        image: {
          label: "Image",
          widget: "image",
        },
        link: {
          label: "Link",
          widget: "string",
          required: false,
        },
      },
    }),
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

const ContactUsSection = generateCmsSection<ContactUsSectionType>({
  label: "Contact Us Section",
  name: "contactUsSection",
  widget: "object",
  properties: {
    heading: {
      label: "Heading",
      widget: "text",
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
    CoreLearningZoneSection,
    EventsSection,
    ServicesSection,
    ProductsSection,
    TestimonialsSection,
    VideosSection,
    ContactUsSection,
  ],
};

export default LandingPage;
