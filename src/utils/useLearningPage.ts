import { useStaticQuery, graphql } from "gatsby";
import { ServicesPage } from "types";

const useLearningPage = (): ServicesPage => {
  const data = useStaticQuery(graphql`
    query LearningPageQuery {
      main: allMarkdownRemark(
        filter: { frontmatter: { key: { eq: "learning" } } }
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

  return data.main.nodes[0].frontmatter.pages.learning;
};

export default useLearningPage;
