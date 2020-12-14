import { useStaticQuery, graphql } from "gatsby";
import { EventSettingsDTO } from "types";

const useEventSettings = () => {
  const data: EventSettingsDTO["data"] = useStaticQuery(graphql`
    query EventSettingsQuery {
      markdownRemark(fields: { slug: { eq: "/event-settings/" } }) {
        frontmatter {
          eventSettings {
            refundPolicy
          }
        }
      }
    }
  `);
  return data.markdownRemark.frontmatter.eventSettings;
};

export default useEventSettings;
