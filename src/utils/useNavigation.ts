import { useStaticQuery, graphql } from "gatsby";
import { NavigationInfoDTO } from "types";

type Pages = {
  label: string;
  url: string;
  description?: string;
}[];

const useNavigation = () => {
  const data: NavigationInfoDTO["data"] = useStaticQuery(graphql`
    query NavigationInfoQuery {
      markdownRemark(fields: { slug: { eq: "/navigation/" } }) {
        frontmatter {
          navigation {
            links {
              label
              url
              description
            }
          }
        }
      }
    }
  `);
  return data.markdownRemark.frontmatter.navigation;
};

export default useNavigation;
