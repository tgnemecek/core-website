const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");
const schema = require("./src/schema");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

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
      console.log(edge.node.frontmatter);
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.component)}.js`
        ),
      });
    });
  });
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

    console.log(formatted);

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
