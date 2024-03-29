import { graphql, useStaticQuery } from "gatsby";

type UseSiteMetadata = {
  title: string;
  description: string;
};

const useSiteMetadata = (): UseSiteMetadata => {
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
