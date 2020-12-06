import { useStaticQuery, graphql } from "gatsby";
import { ServicesPageDTO } from "types";

const useLearningPage = (): ServicesPageDTO => {
  // const data = useStaticQuery(graphql`
  //   query LearningPageQuery {
  //     main: allMarkdownRemark(
  //       filter: { frontmatter: { key: { eq: "learning" } } }
  //     ) {
  //       nodes {
  //         frontmatter {
  //           pages {
  //             learning {
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
  // return data.main.nodes[0].frontmatter.pages.learning;
};

export default useLearningPage;
