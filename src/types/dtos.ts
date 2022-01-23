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
      fields: {
        slug: string;
      };
      frontmatter: Frontmatter;
    };
  };
};

export type GenericPageDTO<Frontmatter> = {
  data: {
    markdownRemark: {
      fields: {
        slug: string;
      };
      frontmatter: {
        pages: Frontmatter;
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

export type LandingPageDTO = GenericPageDTO<{ LandingPage: LandingPage }>;

export type ServicePageDTO = GenericPageDTO<{ ServicePage: ServicePage }>;

export type TeamPageDTO = GenericPageDTO<{ TeamPage: TeamPage }>;

export type LegalPageDTO = GenericPageDTO<{ LegalPage: LegalPage }>;

export type EventPageDTO = GenericDTO<{
  events: EventPage;
}>;

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
          };
          frontmatter: {
            events: EventFeed;
          };
        };
      }[];
    };
    information: {
      frontmatter: {
        pages: {
          LandingPage: { eventsSection: EventsSection };
        };
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
          };
          frontmatter: {
            posts: Post;
          };
        };
      }[];
    };
    information: {
      frontmatter: {
        pages: {
          LandingPage: { postsSection: PostsSection };
        };
      };
    };
  };
};

export type PostPageDTO = GenericDTO<{
  posts: PostPage;
}>;
