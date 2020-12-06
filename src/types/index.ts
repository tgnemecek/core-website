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

export type ServiceBenefitsType = string;

export type ServiceExplanationType = {
  text: string;
  image: string;
};

export type MemberType = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  video: string;
  linkedin?: string;
};

// Types for each page query

export type GenericDTO<FrontmatterType> = {
  data: {
    markdownRemark: {
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
  benefits: ServiceBenefitsType;
  explanation: ServiceExplanationType;
}>;

export type TeamPageDTO = PagesDTO<{
  hero: HeroType;
  members: MemberType[];
}>;

export type EventPageDTO = GenericDTO<{
  events: {
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
}>;
