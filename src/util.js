import { graphql, useStaticQuery } from "gatsby";

const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/;

export const cleanNodeKey = (props) => {
  return props.children.map((child) => {
    return {
      ...child,
      props: {
        ...child.props,
        nodeKey: null,
      },
    };
  });
};

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

export const isVideoValid = (link) => {
  const matches = link.match(youtubeRegex);
  return Boolean(matches);
};

export const getVideoId = (link) => {
  const matches = link.match(youtubeRegex);
  return matches[1];
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
