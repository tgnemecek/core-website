import { useStaticQuery, graphql } from "gatsby";
import { Settings } from "types";

const useSettings = () => {
  const { general, navigation, contact } = useStaticQuery(graphql`
    query SettingsQuery {
      general: markdownRemark(
        fields: { slug: { eq: "/general/" }, collection: { eq: "settings" } }
      ) {
        fields {
          settings {
            heroImage
            logo
            logoSmall
          }
        }
      }
      navigation: markdownRemark(
        fields: { slug: { eq: "/navigation/" }, collection: { eq: "settings" } }
      ) {
        fields {
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
        fields {
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
    ...general.fields.settings,
    ...navigation.fields.settings,
    ...contact.fields.settings,
  } as Settings;
};

export default useSettings;
