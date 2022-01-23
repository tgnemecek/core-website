import { useStaticQuery, graphql } from "gatsby";
import { EventFeedDTO } from "types";
import { recursivelyFormatDate } from "utils";

const useEventFeed = () => {
  const { events, information }: EventFeedDTO["data"] = useStaticQuery(graphql`
    query EventFeedQuery {
      events: allMarkdownRemark(
        filter: { frontmatter: { collection: { eq: "events" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              events {
                date
                duration
                image
                language
                subtitle
                title
                isOnline
                tickets {
                  id
                  description
                  price
                  endsOn
                }
              }
            }
          }
        }
      }
      information: markdownRemark(
        frontmatter: { template: { eq: "LandingPage" } }
      ) {
        frontmatter {
          pages {
            LandingPage {
              eventsSection {
                heading
                subheading
              }
            }
          }
        }
      }
    }
  `);
  return {
    ...information.frontmatter.pages.LandingPage.eventsSection,
    events: events.edges.map(({ node }: any) => ({
      ...recursivelyFormatDate(node.frontmatter.events),
      slug: node.fields.slug,
    })),
  };
};

export default useEventFeed;
