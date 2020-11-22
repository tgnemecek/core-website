import { useStaticQuery, graphql } from "gatsby";
import { TeamPageDTO } from "types";

const useTeamPage = (): TeamPageDTO => {
  const data = useStaticQuery(graphql`
    query TeamPageQuery {
      team: allMarkdownRemark(
        filter: { frontmatter: { key: { eq: "team" } } }
      ) {
        nodes {
          frontmatter {
            pages {
              team {
                hero {
                  title
                  image
                }
                members {
                  name
                  role
                  photo
                  video
                  bio
                  linkedin
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.team.nodes[0].frontmatter.pages.team;
};

export default useTeamPage;
