const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const schema = require("./src/schema");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const createMainPages = () => {
    return graphql(`
      {
        allMarkdownRemark(
          filter: { frontmatter: { collection: { eq: "pages" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                component
              }
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        result.errors.forEach((e) => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const edges = result.data.allMarkdownRemark.edges;

      edges.forEach((edge) => {
        const id = edge.node.id;
        createPage({
          path: edge.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.component)}/index.tsx`
          ),
          context: {
            id,
          },
        });
      });
    });
  };

  const createEventPage = () => {
    return graphql(`
      {
        allMarkdownRemark(
          filter: { frontmatter: { collection: { eq: "events" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        result.errors.forEach((e) => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const edges = result.data.allMarkdownRemark.edges;

      edges.forEach((edge) => {
        const id = edge.node.id;
        console.log("HERES THE EVENT");
        console.log({ edge });
        createPage({
          path: `/event${edge.node.fields.slug}`,
          component: path.resolve(`src/templates/EventPage/index.tsx`),
          context: {
            id,
          },
        });
      });
    });
  };
  return Promise.all([createMainPages(), createEventPage()]);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });

    if (node.frontmatter.collection === "pages") {
      createNodeField({
        name: "slug",
        node: {
          ...node,
          frontmatter: {
            pages: {
              [value.replace(/\//g, "") || "landing"]: node.frontmatter,
            },
            component: node.frontmatter.component,
            collection: node.frontmatter.collection,
          },
        },
        value,
      });
    } else {
      createNodeField({
        name: "slug",
        node: {
          ...node,
          frontmatter: {
            [node.frontmatter.collection]: node.frontmatter,
            collection: node.frontmatter.collection,
          },
        },
        value,
      });
    }
  }
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;
//   fmImagesToRelative(node); // convert image paths for gatsby images

//   if (node.internal.type === `MarkdownRemark`) {
//     console.dir({ node }, { depth: null });
//     const value = createFilePath({ node, getNode });
// const formatted = {
//   ...node,
//   frontmatter: {
//     [node.frontmatter.collection]: {
//       [node.frontmatter.key]: node.frontmatter,
//     },
//     key: node.frontmatter.key,
//     collection: node.frontmatter.collection,
//     component: node.frontmatter.component,
//   },
// };

//     createNodeField({
//       name: `slug`,
//       node: formatted,
//       value,
//     });
//   }
// };

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(schema);
};
