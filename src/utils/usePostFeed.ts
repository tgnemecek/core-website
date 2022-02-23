import { useStaticQuery, graphql } from "gatsby";
import { PostFeedDTO } from "types";
import { recursivelyFormatDate } from "utils";

const usePostFeed = () => {
  const { posts, information }: PostFeedDTO["data"] = useStaticQuery(graphql`
    query PostFeedQuery {
      posts: allMarkdownRemark(
        filter: { fields: { collection: { eq: "post" } } }
      ) {
        edges {
          node {
            fields {
              slug
              post {
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
      information: markdownRemark(fields: { slug: { eq: "/landing/" } }) {
        fields {
          LandingPage {
            postsSection {
              heading
              subheading
            }
          }
        }
      }
    }
  `);
  return {
    ...information.fields.LandingPage.postsSection,
    posts: posts.edges.map(({ node }) => ({
      ...recursivelyFormatDate(node.fields.post),
      slug: node.fields.slug,
    })),
  };
};

export default usePostFeed;
