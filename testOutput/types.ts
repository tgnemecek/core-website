export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  Node: any;
};

export type About = {
  __typename?: 'About';
  text?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type Contact = {
  __typename?: 'Contact';
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone1?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};


export type EventPage = {
  __typename?: 'EventPage';
  id: Scalars['String'];
  collection: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  video?: Maybe<Scalars['String']>;
  date: Scalars['Date'];
  duration: Scalars['Int'];
  language: Array<Scalars['String']>;
  isOnline: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  tickets: Array<Ticket>;
};

export type EventSettings = {
  __typename?: 'EventSettings';
  refundPolicy?: Maybe<Scalars['String']>;
};

export type Explanation = {
  __typename?: 'Explanation';
  text: Scalars['String'];
  image: Scalars['String'];
};

export type Fields = {
  __typename?: 'Fields';
  slug?: Maybe<Scalars['String']>;
};

export type Frontmatter = {
  __typename?: 'Frontmatter';
  pages?: Maybe<Pages>;
  events?: Maybe<EventPage>;
  contact?: Maybe<Contact>;
  navigation?: Maybe<Navigation>;
  eventSettings?: Maybe<EventSettings>;
};

export type Hero = {
  __typename?: 'Hero';
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type LandingPage = {
  __typename?: 'LandingPage';
  collection?: Maybe<Scalars['String']>;
  hero: Hero;
  about: About;
  services: Array<Service>;
  products: Array<Product>;
  testimonials: Array<Testimonial>;
  title?: Maybe<Scalars['String']>;
  videos: Array<Video>;
};

export type MarkdownRemark = Node & {
  __typename?: 'MarkdownRemark';
  frontmatter?: Maybe<Frontmatter>;
  fields?: Maybe<Fields>;
};

export type Member = {
  __typename?: 'Member';
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

export type Navigation = {
  __typename?: 'Navigation';
  links: Array<NavigationLink>;
};

export type NavigationLink = {
  __typename?: 'NavigationLink';
  label: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


export type Pages = {
  __typename?: 'Pages';
  landing?: Maybe<LandingPage>;
  team?: Maybe<TeamPage>;
  services?: Maybe<ServicesPage>;
  coaching?: Maybe<ServicesPage>;
  leading?: Maybe<ServicesPage>;
  learning?: Maybe<ServicesPage>;
};

export type Product = {
  __typename?: 'Product';
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type Service = {
  __typename?: 'Service';
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ServicesPage = {
  __typename?: 'ServicesPage';
  collection?: Maybe<Scalars['String']>;
  hero?: Maybe<Hero>;
  explanation?: Maybe<Explanation>;
  benefits?: Maybe<Scalars['String']>;
};

export type TeamPage = {
  __typename?: 'TeamPage';
  collection?: Maybe<Scalars['String']>;
  hero?: Maybe<Hero>;
  members?: Maybe<Array<Maybe<Member>>>;
};

export type Testimonial = {
  __typename?: 'Testimonial';
  author?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  testimonial?: Maybe<Scalars['String']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Int'];
  endsOn: Scalars['String'];
};

export type Video = {
  __typename?: 'Video';
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
};
