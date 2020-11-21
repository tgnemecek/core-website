import { graphql, useStaticQuery } from "gatsby";

const getContactEmail = (): string => {
  const data = useStaticQuery(graphql`
    query EmailQuery {
      contact: allMarkdownRemark(
        filter: { frontmatter: { key: { eq: "contact" } } }
      ) {
        nodes {
          frontmatter {
            information {
              contact {
                email
              }
            }
          }
        }
      }
    }
  `);
  return data.contact.nodes[0].frontmatter.information.contact.email;
};

export default getContactEmail;
