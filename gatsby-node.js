const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");
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
                category
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
        createPage({
          path: edge.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.component)}.tsx`
          ),
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
        createPage({
          path: `event/${edge.slug}`,
          component: path.resolve(`src/templates/EventPage.tsx`),
        });
      });
    });
  };
  return Promise.all([createMainPages(), createEventPage()]);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    const formatted = {
      ...node,
      frontmatter: {
        [node.frontmatter.collection]: {
          [node.frontmatter.key]: node.frontmatter,
        },
        key: node.frontmatter.key,
        collection: node.frontmatter.collection,
        component: node.frontmatter.component,
      },
    };

    createNodeField({
      name: `slug`,
      node: formatted,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(schema);
};
