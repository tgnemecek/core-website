import {
  GeneralSettings,
  About,
  Testimonial,
  Service,
  Product,
  Video,
  EventPage,
  ServicesPage,
  TeamPage,
  LegalPage,
} from "./__generated__";
import { EventFeed, Post } from "./general";

export type GenericDTO<Frontmatter> = {
  data: {
    markdownRemark: {
      fields: {
        slug: string;
      };
      frontmatter: Frontmatter;
    };
  };
};

export type GeneralSettingsDTO = GenericDTO<{
  generalSettings: GeneralSettings;
}>;

export type PagesDTO<Page> = GenericDTO<{
  pages: Record<string, Page>;
}>;

export type LandingPageDTO = PagesDTO<{
  about: About;
  testimonials: Testimonial[];
  services: Service[];
  products: Product[];
  videos: Video[];
}>;

export type ServicesPageDTO = PagesDTO<ServicesPage>;

export type TeamPageDTO = PagesDTO<TeamPage>;

export type LegalPageDTO = PagesDTO<LegalPage>;

export type EventPageDTO = GenericDTO<{
  events: EventPage;
}>;

export type NavigationInfoDTO = GenericDTO<{
  navigation: {
    links: {
      label: string;
      url: string;
      description?: string;
    }[];
  };
}>;

export type ContactInfoDTO = GenericDTO<{
  contact: Record<"address" | "email" | "phone1" | "phone2" | "link", string>;
}>;

export type EventSettingsDTO = GenericDTO<{
  eventSettings: Record<"refundPolicy", string>;
}>;

export type EventFeedDTO = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string;
          };
          frontmatter: {
            events: EventFeed;
          };
        };
      }[];
    };
  };
};

export type PostFeedDTO = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string;
          };
          frontmatter: {
            posts: Post;
          };
        };
      }[];
    };
  };
};

export type PostPageDTO = GenericDTO<{
  posts: Post;
}>;
