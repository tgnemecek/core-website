import { useStaticQuery, graphql } from "gatsby";
import { ServicesPage } from "types";

const useCoachingPage = (): ServicesPage => {
  const data = useStaticQuery(graphql`
    query CoachingPageQuery {
      main: allMarkdownRemark(
        filter: { frontmatter: { key: { eq: "coaching" } } }
      ) {
        nodes {
          frontmatter {
            pages {
              leading {
                benefits
                explanation {
                  text
                  image
                }
                hero {
                  title
                  image
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.main.nodes[0].frontmatter.pages.coaching;
};

export default useCoachingPage;
