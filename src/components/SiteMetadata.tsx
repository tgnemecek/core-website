import { graphql, useStaticQuery } from "gatsby";

type SiteMetadataType = {
  title: string;
  description: string;
};

const useSiteMetadata = (): SiteMetadataType => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );
  return site.siteMetadata;
};

export default useSiteMetadata;
