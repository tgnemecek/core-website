import {
  PostsSection,
  LandingPage,
  EventPage,
  ServicePage,
  TeamPage,
  LegalPage,
  PostPage,
} from "./__generated__";
import { EventFeed, Post } from "./general";
import { EventsSection } from ".";

export type GenericDTO<Frontmatter> = {
  data: {
    markdownRemark: {
      fields: Frontmatter & {
        slug: string;
      };
    };
  };
};

export type GenericEdgesDTO<T> = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: T;
        };
      }[];
    };
  };
};

export type LandingPageDTO = GenericDTO<{ LandingPage: LandingPage }>;

export type ServicePageDTO = GenericDTO<{ ServicePage: ServicePage }>;

export type TeamPageDTO = GenericDTO<{ TeamPage: TeamPage }>;

export type LegalPageDTO = GenericDTO<{ LegalPage: LegalPage }>;

export type EventPageDTO = GenericDTO<{ event: EventPage }>;

export type PostPageDTO = GenericDTO<{ post: PostPage }>;

export type EventSettingsDTO = GenericDTO<{
  eventSettings: Record<"refundPolicy", string>;
}>;

export type EventFeedDTO = {
  data: {
    events: {
      edges: {
        node: {
          fields: {
            slug: string;
            event: EventFeed;
          };
        };
      }[];
    };
    information: {
      fields: {
        LandingPage: { eventsSection: EventsSection };
      };
    };
  };
};

export type PostFeedDTO = {
  data: {
    posts: {
      edges: {
        node: {
          fields: {
            slug: string;
            post: Post;
          };
        };
      }[];
    };
    information: {
      fields: {
        LandingPage: { postsSection: PostsSection };
      };
    };
  };
};
