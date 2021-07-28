require("reflect-metadata");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const fs = require("fs");

import * as typegraphqlSchema from "../src/schema/index";
import { buildSchema } from "type-graphql";
import { GatsbyNode } from "gatsby";

const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
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
    } as const;

    const value = createFilePath({ node, getNode }) as keyof typeof pageMap;

    const { frontmatter } = node as any;

    if (frontmatter.collection === "pages") {
      const { key, component } = pageMap[value];
      createNodeField({
        name: "slug",
        node: {
          ...node,
          frontmatter: {
            component,
            pages: {
              [key]: {
                ...frontmatter,
              },
            },
            collection: frontmatter.collection,
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
            [frontmatter.collection]: node.frontmatter,
            collection: frontmatter.collection,
          },
        },
        value,
      });
    }
  }
};

const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
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
        result.errors.forEach((e: any) => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const edges = (result.data as any).allMarkdownRemark.edges;

      edges.forEach((edge: any) => {
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
        result.errors.forEach((e: any) => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const edges = (result.data as any).allMarkdownRemark.edges;

      edges.forEach((edge: any) => {
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
  await Promise.all([createMainPages(), createEventPage()]);
};

const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async ({
  actions,
}) => {
  const { createTypes, addThirdPartySchema } = actions;

  const schemaFilePath = "./config/generated-schema.gql";

  await buildSchema({
    resolvers: Object.values(typegraphqlSchema) as any,
    emitSchemaFile: schemaFilePath,
  });

  const schema = fs.readFileSync(schemaFilePath, {
    encoding: "utf-8",
  });

  console.log({ schema });

  // addThirdPartySchema({
  //   schema,
  // });

  createTypes(schema);
};

exports.createSchemaCustomization = createSchemaCustomization;
exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
