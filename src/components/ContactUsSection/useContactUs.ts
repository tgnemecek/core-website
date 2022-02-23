import { useStaticQuery, graphql } from "gatsby";
import { ContactUsSection } from "types";

const useContactUs = () => {
  const { markdownRemark } = useStaticQuery(graphql`
    query ContactUsQuery {
      markdownRemark(fields: { slug: { eq: "/landing/" } }) {
        fields {
          LandingPage {
            contactUsSection {
              heading
            }
          }
        }
      }
    }
  `);

  return markdownRemark.fields.LandingPage.contactUsSection as ContactUsSection;
};

export default useContactUs;
