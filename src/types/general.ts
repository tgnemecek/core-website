import { EventPage, PostPage } from "./__generated__";

export type Course = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
};

export type PayPalButtonName =
  | "careerStrengths"
  | "leaderStrengths"
  | "entrepreneurStrengths"
  | "personalStrengths"
  | "organizationAndTeamProfiles"
  | "donation";

export type ServiceName = "leading" | "coaching" | "learning" | "business";

export type Event = EventPage;

export type Post = PostPage;

export type EventFeed = Pick<
  Event,
  | "date"
  | "duration"
  | "image"
  | "language"
  | "subtitle"
  | "title"
  | "slug"
  | "tickets"
>;

export type PostFeed = Pick<
  Event,
  | "date"
  | "duration"
  | "image"
  | "language"
  | "subtitle"
  | "title"
  | "slug"
  | "tickets"
>;

type OnlyRequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type PickOnlyRequired<T> = Pick<T, OnlyRequiredKeys<T>>;
