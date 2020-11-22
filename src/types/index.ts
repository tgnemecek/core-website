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

export type BenefitsType = string;

export type ExplanationType = {
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

export type LandingPageDTO = () => {
  hero: HeroType;
  about: AboutType;
  testimonials: TestimonialType[];
  services: ServiceType[];
  products: ProductType[];
  videos: VideoType[];
};

export type ServicesPageDTO = {
  hero: HeroType;
  benefits: BenefitsType;
  explanation: ExplanationType;
};

export type TeamPageDTO = {
  hero: HeroType;
  members: MemberType[];
};
