import {
  CmsCollectionFile,
  CmsField,
  CmsFieldObject,
  CmsFieldList,
} from "netlify-cms-core";
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
  TypeSafeCmsField,
} from "types";
import generateCmsSection from "../generate-cms-section";

const AboutSection: TypeSafeCmsField<AboutSectionType, CmsFieldObject> = {
  label: "About Section",
  name: "about",
  widget: "object",
  fields: [
    {
      label: "Heading",
      widget: "text",
      name: "heading",
    },
    {
      label: "Body",
      widget: "text",
      name: "text",
    },
  ],
};

const PostsSection: TypeSafeCmsField<PostsSectionType, CmsFieldObject> = {
  label: "Posts Section",
  name: "posts",
  widget: "object",
  fields: [
    {
      label: "Heading",
      widget: "string",
      name: "heading",
    },
    {
      label: "Subheading",
      widget: "string",
      name: "subheading",
    },
  ],
};

const CoreLearningZoneSection: TypeSafeCmsField<
  CoreLearningZoneSectionType,
  CmsFieldObject
> = {
  label: "Core Learning Zone Section",
  name: "coreLearningZoneSection",
  widget: "object",
  fields: [
    {
      label: "Heading",
      widget: "string",
      name: "heading",
    },
    {
      label: "Subheading",
      widget: "string",
      name: "subheading",
    },
    {
      label: "Subheading",
      widget: "string",
      name: "extraText",
      required: false,
    },
  ],
};

const EventsSection: TypeSafeCmsField<EventsSectionType, CmsFieldObject> = {
  label: "Events Section",
  name: "eventsSection",
  widget: "object",
  fields: [
    {
      label: "Heading",
      widget: "string",
      name: "heading",
    },
    {
      label: "Subheading",
      widget: "string",
      name: "subheading",
    },
  ],
};

const TestimonialsSection: TypeSafeCmsField<Testimonial, CmsFieldList> = {
  label: "Testimonials Section",
  name: "testimonials",
  widget: "list",
  collapsed: false,
  fields: [
    {
      label: "Testimonial",
      widget: "text",
      name: "testimonial",
    },
    {
      label: "Author",
      widget: "string",
      name: "author",
    },
    {
      label: "Role",
      widget: "string",
      name: "role",
    },
  ],
};

const ServicesSection: TypeSafeCmsField<Service, CmsFieldList> = {
  label: "Services Section",
  name: "services",
  widget: "list",
  allow_add: false,
  collapsed: false,
  fields: [
    {
      label: "Title",
      widget: "string",
      name: "title",
    },
    {
      label: "Short Description",
      widget: "text",
      name: "description",
    },
    {
      label: "Image",
      widget: "image",
      name: "image",
    },
    {
      label: "Name",
      widget: "string",
      name: "name",
    },
  ],
};

const ProductsSection: TypeSafeCmsField<ProductsSectionType, CmsFieldObject> = {
  label: "Products Section",
  name: "productsSection",
  widget: "object",
  fields: [
    {
      label: "Heading",
      widget: "string",
      name: "heading",
    },
    {
      label: "Subheading",
      widget: "string",
      name: "subheading",
    },
    {
      label: "Products",
      name: "products",
      widget: "list",
      fields: [
        {
          label: "Title",
          widget: "string",
          name: "title",
        },
        {
          label: "Subtitle",
          widget: "string",
          name: "subtitle",
          required: false,
        },
        {
          label: "Description",
          widget: "string",
          name: "description",
        },
        {
          label: "Image",
          widget: "image",
          name: "image",
        },
        {
          label: "Link",
          widget: "string",
          name: "link",
          required: false,
        },
      ],
    },
  ],
};

const VideosSection: TypeSafeCmsField<Video, CmsFieldList> = {
  label: "Videos Section",
  name: "videos",
  widget: "list",
  collapsed: false,
  fields: [
    {
      label: "Video Title",
      widget: "string",
      name: "title",
    },
    {
      label: "Video Subtitle",
      widget: "string",
      name: "subtitle",
      required: false,
    },
    {
      label: "Video Link",
      widget: "string",
      name: "link",
    },
  ],
};

const ContactUsSection: TypeSafeCmsField<ContactUsSectionType, CmsFieldObject> =
  {
    label: "Contact Us Section",
    name: "contactUsSection",
    widget: "object",
    fields: [
      {
        label: "Heading",
        widget: "text",
        name: "heading",
      },
    ],
  };

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
