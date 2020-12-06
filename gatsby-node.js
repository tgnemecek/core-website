const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const schema = require("./src/schema");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });

    if (node.frontmatter.collection === "pages") {
      const pageKey = value === "/" ? "landing" : "services";
      createNodeField({
        name: "slug",
        node: {
          ...node,
          frontmatter: {
            pages: {
              [pageKey]: node.frontmatter,
            },
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
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        result.errors.forEach((e) => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const slugMap = {
        "/": "LandingPage",
        "/coaching/": "ServicesPage",
        "/leading/": "ServicesPage",
        "/learning/": "ServicesPage",
        "/team/": "TeamPage",
      };

      const edges = result.data.allMarkdownRemark.edges;

      edges.forEach((edge) => {
        const {
          id,
          fields: { slug },
        } = edge.node;
        createPage({
          path: slug,
          component: path.resolve(`src/templates/${slugMap[slug]}/index.tsx`),
          context: {
            id,
            slug,
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(schema);
};
