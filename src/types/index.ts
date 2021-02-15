export type HeroType = {
  title: string;
  image: string;
};

export type AboutType = {
  text: string;
  image: string;
};

export type TestimonialType = {
  author: string;
  role: string;
  testimonial: string;
};

export type ServiceType = {
  title: string;
  name: string;
  description: string;
  image: string;
};

export type PayPalButtonName =
  | "careerStrengths"
  | "leaderStrengths"
  | "entrepreneuerStrengths"
  | "personalStrengths"
  | "donation";

export type ProductType = {
  description: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
};

export type VideoType = {
  title: string;
  subtitle: string;
  link: string;
};

export type ServiceNameType = "leading" | "coaching" | "learning";

export type MemberType = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  video: string;
  linkedin?: string;
};

export type LanguageType = "EN" | "ES";

// If this gets updated, please update the one in lambda/types.ts as well
export type TicketType = {
  id: string;
  description: string;
  price: number;
  endsOn: "startOfEvent" | "startOfDay" | "oneWeek";
};

export type EventType = {
  productId: string;
  meetingId: string;
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  date: Date;
  duration: number;
  language: LanguageType | LanguageType[];
  isOnline: boolean;
  location?: string;
  tickets: TicketType[];
};

// Data Transfer Objects:

export type GenericDTO<FrontmatterType> = {
  data: {
    markdownRemark: {
      fields: {
        slug?: string;
      };
      frontmatter: FrontmatterType;
    };
  };
};

export type PagesDTO<PageType> = GenericDTO<{
  pages: Record<string, PageType>;
}>;

export type LandingPageDTO = PagesDTO<{
  hero: HeroType;
  about: AboutType;
  testimonials: TestimonialType[];
  services: ServiceType[];
  products: ProductType[];
  videos: VideoType[];
}>;

export type ServicesPageDTO = PagesDTO<{
  hero: HeroType;
  explanation: {
    text: string;
    image: string;
  };
  benefits: string;
}>;

export type TeamPageDTO = PagesDTO<{
  hero: HeroType;
  members: MemberType[];
}>;

export type EventPageDTO = GenericDTO<{
  events: EventType;
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

export type EventFeedType = Pick<
  EventType,
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
            events: EventFeedType;
          };
        };
      }[];
    };
  };
};
