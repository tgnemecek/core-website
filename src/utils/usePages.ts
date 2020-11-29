import { useStaticQuery, graphql } from "gatsby";

type Pages = {
  label: string;
  url: string;
  description?: string;
}[];

const usePages = () => {
  const data = useStaticQuery(
    graphql`
      query NavbarQuery {
        pages: allMarkdownRemark(
          filter: { frontmatter: { key: { eq: "navigation" } } }
        ) {
          nodes {
            frontmatter {
              information {
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
        }
      }
    `
  );
  return data.pages.nodes[0].frontmatter.information.navigation.links as Pages;
};

export default usePages;
