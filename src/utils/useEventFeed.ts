import { useStaticQuery, graphql } from "gatsby";
import { EventFeedDTO } from "types";
import { recursivelyFormatDate } from "utils";

const useEventFeed = () => {
  const { events, information }: EventFeedDTO["data"] = useStaticQuery(graphql`
    query EventFeedQuery {
      events: allMarkdownRemark(
        filter: { fields: { collection: { eq: "event" } } }
      ) {
        edges {
          node {
            fields {
              slug
              event {
                date
                duration
                image
                language
                subtitle
                title
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
      information: markdownRemark(fields: { slug: { eq: "/landing/" } }) {
        fields {
          LandingPage {
            eventsSection {
              heading
              subheading
            }
          }
        }
      }
    }
  `);
  return {
    ...information.fields.LandingPage.eventsSection,
    events: events.edges.map(({ node }: any) => ({
      ...recursivelyFormatDate(node.fields.event),
      slug: node.fields.slug,
    })),
  };
};

export default useEventFeed;
