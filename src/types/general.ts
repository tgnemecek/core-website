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
  | "isOnline"
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
  | "isOnline"
  | "tickets"
>;
