import { useStaticQuery, graphql } from "gatsby";
import { EventSettingsDTO } from "types";

const useEventSettings = () => {
  const data: EventSettingsDTO["data"] = useStaticQuery(graphql`
    query EventSettingsQuery {
      markdownRemark(fields: { slug: { eq: "/events/" } }) {
        frontmatter {
          events {
            refundPolicy
          }
        }
      }
    }
  `);
  return data.markdownRemark.frontmatter.events;
};

export default useEventSettings;
