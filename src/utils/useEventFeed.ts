import { useStaticQuery, graphql } from "gatsby";
import { EventFeedDTO } from "types";

const useEventFeed = () => {
  const data: EventFeedDTO["data"] = useStaticQuery(graphql`
    query TestQuery {
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
                image
                language
                subtitle
                title
              }
            }
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.edges.map(({ node }) => ({
    ...node.frontmatter.events,
    slug: node.fields.slug,
  }));
};

export default useEventFeed;
