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
              key
            }
          }
        }
      }
    }
  `).then((result) => {
    console.dir(result, { depth: null });
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.key)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    const formatted = { ...node };

    formatted.frontmatter = {
      [node.frontmatter.collection]: {
        [node.frontmatter.key]: node.frontmatter,
      },
      key: node.frontmatter.key,
      collection: node.frontmatter.collection,
    };

    if (node.frontmatter.key === "contact") {
      console.log(formatted);
    }

    createNodeField({
      name: `slug`,
      node: formatted,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = schema;
  createTypes(typeDefs);
};
