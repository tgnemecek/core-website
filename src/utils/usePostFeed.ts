import { useStaticQuery, graphql } from "gatsby";
import { PostFeedDTO } from "types";
import { recursivelyFormatDate } from "utils";

const usePostFeed = () => {
  const data: PostFeedDTO["data"] = useStaticQuery(graphql`
    query PostFeedQuery {
      allMarkdownRemark(
        filter: { frontmatter: { collection: { eq: "posts" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              posts {
                title
                text
                date
                image
                video
              }
            }
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.edges.map(({ node }) => ({
    ...recursivelyFormatDate(node.frontmatter.posts),
    slug: node.fields.slug,
  }));
};

export default usePostFeed;
