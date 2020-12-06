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

export type EventType = {
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  date: Date;
  duration: number;
  language: string[];
  isOnline: boolean;
  location?: string;
  tickets: {
    description: string;
    price: number;
    endsOn: string;
  }[];
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
  benefits: {
    text: string;
    image: string;
  };
  explanation: string;
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

export type EventFeedDTO = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string;
          };
          frontmatter: {
            events: Pick<
              EventType,
              "date" | "image" | "language" | "subtitle" | "title"
            >;
          };
        };
      }[];
    };
  };
};
