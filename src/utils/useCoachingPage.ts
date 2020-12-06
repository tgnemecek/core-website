import { useStaticQuery, graphql } from "gatsby";
import { ServicesPageDTO } from "types";

const useCoachingPage = (): ServicesPageDTO => {
  // const data = useStaticQuery(graphql`
  //   query CoachingPageQuery {
  //     main: allMarkdownRemark(
  //       filter: { frontmatter: { key: { eq: "coaching" } } }
  //     ) {
  //       nodes {
  //         frontmatter {
  //           pages {
  //             coaching {
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
  // return data.main.nodes[0].frontmatter.pages.coaching;
};

export default useCoachingPage;
