import { useStaticQuery, graphql } from "gatsby";
import { GeneralSettingsDTO } from "types";

const useGeneralSettings = () => {
  const data: GeneralSettingsDTO["data"] = useStaticQuery(graphql`
    query GeneralSettingsQuery {
      markdownRemark(fields: { slug: { eq: "/general-settings/" } }) {
        frontmatter {
          generalSettings {
            brandName
            heroImage
            refundPolicy
          }
        }
      }
    }
  `);
  return data.markdownRemark.frontmatter.generalSettings;
};

export default useGeneralSettings;
