import { graphql, useStaticQuery } from "gatsby";

export const dataFormatter = (nodes) => {
  const obj = {};
  nodes.forEach(({ frontmatter }) => {
    Object.keys(frontmatter).forEach((key) => {
      if (frontmatter[key]) {
        obj[key] = frontmatter[key];
      }
    });
  });
  return obj;
};

export const shuffleArray = (inputData) => {
  const data = [...inputData];
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
  }
  return data;
};

export const getVideoId = (link) => {
  const videoIdIndex = link.indexOf("?v=") + 3;
  const videoId = link.slice(videoIdIndex);
  return videoId;
};

export const getContactEmail = () => {
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
