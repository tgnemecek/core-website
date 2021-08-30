import { useStaticQuery, graphql } from "gatsby";
import { EventFeedDTO } from "types";
import { recursivelyFormatDate } from "utils";

const useEventFeed = () => {
  const data: EventFeedDTO["data"] = useStaticQuery(graphql`
    query EventFeedQuery {
      allMarkdownRemark(
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
    }
  `);
  return data.allMarkdownRemark.edges.map(({ node }) => ({
    ...recursivelyFormatDate(node.frontmatter.events),
    slug: node.fields.slug,
  }));
};

export default useEventFeed;
