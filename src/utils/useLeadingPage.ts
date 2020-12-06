import { useStaticQuery, graphql } from "gatsby";
import { ServicesPageDTO } from "types";

const useLeadingPage = (): ServicesPageDTO => {
  // const data = useStaticQuery(graphql`
  //   query LeadingPageQuery {
  //     main: allMarkdownRemark(
  //       filter: { frontmatter: { key: { eq: "leading" } } }
  //     ) {
  //       nodes {
  //         frontmatter {
  //           pages {
  //             leading {
  //               benefits
  //               explanation {
  //                 text
  //                 image
  //               }
  //               hero {
  //                 title
  //                 image
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);
  // return data.main.nodes[0].frontmatter.pages.leading;
};

export default useLeadingPage;
