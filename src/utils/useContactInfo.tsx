import { useStaticQuery, graphql } from "gatsby";

type ContactInfo = Record<string, string | void>;

const useContactInfo = () => {
  // const data = useStaticQuery(graphql`
  //   query FooterQuery {
  //     contact: allMarkdownRemark(
  //       filter: { frontmatter: { key: { eq: "contact" } } }
  //     ) {
  //       nodes {
  //         frontmatter {
  //           information {
  //             contact {
  //               email
  //               link
  //               address
  //               phone1
  //               phone2
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);
  // return data.contact.nodes[0].frontmatter.information.contact as ContactInfo;
};

export default useContactInfo;
