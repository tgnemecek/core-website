import { useStaticQuery, graphql } from "gatsby";
import { ServicesPage } from "types";

const useLeadingPage = (): ServicesPage => {
  const data = useStaticQuery(graphql`
    query LeadingPageQuery {
      main: allMarkdownRemark(
        filter: { frontmatter: { key: { eq: "leading" } } }
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

  return data.main.nodes[0].frontmatter.pages.leading;
};

export default useLeadingPage;
