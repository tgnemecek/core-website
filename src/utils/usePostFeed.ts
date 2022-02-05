import { useStaticQuery, graphql } from "gatsby";
import { PostFeedDTO } from "types";
import { recursivelyFormatDate } from "utils";

const usePostFeed = () => {
  const { posts, information }: PostFeedDTO["data"] = useStaticQuery(graphql`
    query PostFeedQuery {
      posts: allMarkdownRemark(
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
      information: markdownRemark(
        frontmatter: { template: { eq: "LandingPage" } }
      ) {
        frontmatter {
          pages {
            LandingPage {
              postsSection {
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
    ...information.frontmatter.pages.LandingPage.postsSection,
    posts: posts.edges.map(({ node }) => ({
      ...recursivelyFormatDate(node.frontmatter.posts),
      slug: node.fields.slug,
    })),
  };
};

export default usePostFeed;
