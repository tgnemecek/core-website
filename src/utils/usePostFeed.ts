import { useStaticQuery, graphql } from "gatsby";
import { PostFeedDTO } from "types";

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
                body
                date
                image
                video
                id
              }
            }
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.edges.map(({ node }) => ({
    ...node.frontmatter.posts,
    slug: node.fields.slug,
  }));
};

export default usePostFeed;
