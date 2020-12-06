import { useStaticQuery, graphql } from "gatsby";
import { LandingPageDTO } from "types";

const useLandingPage = (): LandingPageDTO => {
  // const data = useStaticQuery(graphql`
  //   query LandingPageQuery {
  //     main: allMarkdownRemark(
  //       filter: { frontmatter: { key: { eq: "landing" } } }
  //     ) {
  //       nodes {
  //         frontmatter {
  //           pages {
  //             landing {
  //               hero {
  //                 title
  //                 image
  //               }
  //               about {
  //                 text
  //                 image
  //               }
  //               testimonials {
  //                 author
  //                 role
  //                 testimonial
  //               }
  //               services {
  //                 title
  //                 name
  //                 description
  //                 image
  //               }
  //               products {
  //                 description
  //                 image
  //                 title
  //                 subtitle
  //                 link
  //               }
  //               videos {
  //                 title
  //                 subtitle
  //                 link
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);
  // return data.main.nodes[0].frontmatter.pages.landing;
};

export default useLandingPage;
