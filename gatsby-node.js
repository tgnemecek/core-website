const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const fs = require("fs");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });

    const pageMap = {
      "/": {
        key: "landing",
        component: "LandingPage",
      },
      "/coaching/": {
        key: "services",
        component: "ServicesPage",
      },
      "/leading/": {
        key: "services",
        component: "ServicesPage",
      },
      "/learning/": {
        key: "services",
        component: "ServicesPage",
      },
      "/team/": {
        key: "team",
        component: "TeamPage",
      },
    };

    if (node.frontmatter.collection === "pages") {
      const { key, component } = pageMap[value];
      createNodeField({
        name: "slug",
        node: {
          ...node,
          frontmatter: {
            component,
            pages: {
              [key]: {
                ...node.frontmatter,
              },
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
        const {
          id,
          fields: { slug },
          frontmatter: { component },
        } = edge.node;
        createPage({
          path: slug,
          component: path.resolve(`src/templates/${component}/index.tsx`),
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
  const schema = fs.readFileSync("./src/schema.gql", {
    encoding: "utf-8",
  });
  createTypes(schema);
};
