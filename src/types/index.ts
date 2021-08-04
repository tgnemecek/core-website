import {
  Hero,
  About,
  Testimonial,
  Service,
  Product,
  Video,
  EventPage,
  Member,
  PostPage,
} from "./__generated__";

export * from "./__generated__";

export type PayPalButtonName =
  | "careerStrengths"
  | "leaderStrengths"
  | "entrepreneuerStrengths"
  | "personalStrengths"
  | "donation";

export type ServiceName = "leading" | "coaching" | "learning";

export type Event = EventPage;

export type GenericDTO<Frontmatter> = {
  data: {
    markdownRemark: {
      fields: {
        slug?: string;
      };
      frontmatter: Frontmatter;
    };
  };
};

export type PagesDTO<Page> = GenericDTO<{
  pages: Record<string, Page>;
}>;

export type LandingPageDTO = PagesDTO<{
  hero: Hero;
  about: About;
  testimonials: Testimonial[];
  services: Service[];
  products: Product[];
  videos: Video[];
}>;

export type ServicesPageDTO = PagesDTO<{
  hero: Hero;
  explanation: {
    text: string;
    image: string;
  };
  benefits: string;
}>;

export type TeamPageDTO = PagesDTO<{
  hero: Hero;
  members: Member[];
}>;

export type EventPageDTO = GenericDTO<{
  events: Event;
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

export type Post = PostPage;

export type PostPageDTO = GenericDTO<{
  posts: Post;
}>;

export type EventFeed = Pick<
  Event,
  | "date"
  | "duration"
  | "image"
  | "language"
  | "subtitle"
  | "title"
  | "slug"
  | "isOnline"
  | "tickets"
>;

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

export type PostFeed = Pick<
  Event,
  | "date"
  | "duration"
  | "image"
  | "language"
  | "subtitle"
  | "title"
  | "slug"
  | "isOnline"
  | "tickets"
>;

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
