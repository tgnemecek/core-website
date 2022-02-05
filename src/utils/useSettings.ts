import { useStaticQuery, graphql } from "gatsby";
import { Settings } from "types";

const useSettings = () => {
  const { general, navigation, contact } = useStaticQuery(graphql`
    query SettingsQuery {
      general: markdownRemark(
        fields: { slug: { eq: "/general/" }, collection: { eq: "settings" } }
      ) {
        frontmatter {
          settings {
            heroImage
            logo
          }
        }
      }
      navigation: markdownRemark(
        fields: { slug: { eq: "/navigation/" }, collection: { eq: "settings" } }
      ) {
        frontmatter {
          settings {
            links {
              description
              label
              url
            }
          }
        }
      }
      contact: markdownRemark(
        fields: { slug: { eq: "/contact/" }, collection: { eq: "settings" } }
      ) {
        frontmatter {
          settings {
            address
            email
            link
            phone1
            phone2
          }
        }
      }
    }
  `);
  return {
    ...general.frontmatter.settings,
    ...navigation.frontmatter.settings,
    ...contact.frontmatter.settings,
  } as Settings;
};

export default useSettings;
