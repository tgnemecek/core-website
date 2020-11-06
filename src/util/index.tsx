import { graphql, useStaticQuery } from "gatsby";
export { default as useBreakpoint } from "./useBreakpoint";

const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/;

export const shuffleArray = (inputData: any[]) => {
  const data = [...inputData];
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
  }
  return data;
};

export const isVideoValid = (link: string) => {
  const matches = link.match(youtubeRegex);
  return Boolean(matches);
};

export const getVideoId = (link: string) => {
  const matches = link.match(youtubeRegex);
  return matches[1];
};

export const getImageId = (link: string) => {
  const matches = link.match(/image\/upload\/.*\/(.*)/);
  return matches ? matches[1] : "";
};

export const getContactEmail = (): string => {
  const data = useStaticQuery(graphql`
    query EmailQuery {
      contact: allMarkdownRemark(
        filter: { frontmatter: { key: { eq: "contact" } } }
      ) {
        nodes {
          frontmatter {
            information {
              contact {
                email
              }
            }
          }
        }
      }
    }
  `);
  return data.contact.nodes[0].frontmatter.information.contact.email;
};
