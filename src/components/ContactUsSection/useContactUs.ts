import { useStaticQuery, graphql } from "gatsby";
import { ContactUsSection } from "types";

const useContactUs = () => {
  const { markdownRemark } = useStaticQuery(graphql`
    query ContactUsQuery {
      markdownRemark(frontmatter: { template: { eq: "LandingPage" } }) {
        frontmatter {
          pages {
            LandingPage {
              contactUsSection {
                heading
              }
            }
          }
        }
      }
    }
  `);

  return markdownRemark.frontmatter.pages.LandingPage
    .contactUsSection as ContactUsSection;
};

export default useContactUs;
