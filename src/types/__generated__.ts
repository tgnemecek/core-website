export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export class Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export class About {
  text?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export class Contact {
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone1?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};


export class EventPage {
  id: Scalars['String'];
  collection: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  video?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  duration: Scalars['Int'];
  language: Array<Language>;
  isOnline: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  tickets: Array<Ticket>;
};

export class Explanation {
  text: Scalars['String'];
  image: Scalars['String'];
};

export class Frontmatter {
  pages?: Maybe<Pages>;
  events?: Maybe<EventPage>;
  posts?: Maybe<PostPage>;
  contact?: Maybe<Contact>;
  navigation?: Maybe<Navigation>;
  generalSettings?: Maybe<GeneralSettings>;
  component?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
};

export class GeneralSettings {
  brandName: Scalars['String'];
  heroImage: Scalars['String'];
  refundPolicy?: Maybe<Scalars['String']>;
};

export class LandingPage {
  collection?: Maybe<Scalars['String']>;
  about: About;
  services: Array<Service>;
  products: Array<Product>;
  testimonials: Array<Testimonial>;
  title?: Maybe<Scalars['String']>;
  videos: Array<Video>;
};

export enum Language {
  En = 'EN',
  Es = 'ES'
}

export class Member {
  name: Scalars['String'];
  role: Scalars['String'];
  photo: Scalars['String'];
  bio: Scalars['String'];
  linkedin?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

export class Navigation {
  links: Array<NavigationLink>;
};

export class NavigationLink {
  label: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export class Pages {
  landing?: Maybe<LandingPage>;
  team?: Maybe<TeamPage>;
  services?: Maybe<ServicesPage>;
  coaching?: Maybe<ServicesPage>;
  leading?: Maybe<ServicesPage>;
  learning?: Maybe<ServicesPage>;
};

export class PostPage {
  id: Scalars['String'];
  collection: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
};

export class Product {
  description: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export class Service {
  title: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export class ServicesPage {
  collection: Scalars['String'];
  explanation: Explanation;
  benefits: Scalars['String'];
  title: Scalars['String'];
};

export class TeamPage {
  collection: Scalars['String'];
  title: Scalars['String'];
  members: Array<Member>;
};

export class Testimonial {
  author: Scalars['String'];
  role: Scalars['String'];
  testimonial: Scalars['String'];
};

export class Ticket {
  id: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Int'];
  endsOn: Scalars['String'];
};

export class Video {
  link: Scalars['String'];
  title: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
};
