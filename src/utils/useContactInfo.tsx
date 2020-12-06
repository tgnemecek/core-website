import { useStaticQuery, graphql } from "gatsby";
import { ContactInfoDTO } from "types";

const useContactInfo = () => {
  const data: ContactInfoDTO["data"] = useStaticQuery(graphql`
    query ContactInfoQuery {
      markdownRemark(fields: { slug: { eq: "/contact/" } }) {
        frontmatter {
          contact {
            email
            phone1
            phone2
            address
            link
          }
        }
      }
    }
  `);
  return data.markdownRemark.frontmatter.contact;
};

export default useContactInfo;
