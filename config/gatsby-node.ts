import path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import fs from "fs";
import { GatsbyNode } from "gatsby";

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
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

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  const createMainPages = async () => {
    const { data, errors } = await graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                component
                collection
              }
            }
          }
        }
      }
    `);

    if (errors) return console.error(errors);

    const pages = (data as any).allMarkdownRemark.edges.filter(
      ({ node }: any) => {
        return node.frontmatter.collection === "pages";
      }
    );

    pages.forEach(({ node }: any) => {
      const {
        id,
        fields: { slug },
        frontmatter: { component },
      } = node;
      createPage({
        path: slug,
        component: path.resolve(`src/templates/${component}/index.tsx`),
        context: {
          id,
          slug,
        },
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
  const createPostPage = () => {
    return graphql(`
      {
        allMarkdownRemark(
          filter: { frontmatter: { collection: { eq: "posts" } } }
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
        console.log({ edge });
        const id = edge.node.id;
        createPage({
          path: `/post${edge.node.fields.slug}`,
          component: path.resolve(`src/templates/PostPage/index.tsx`),
          context: {
            id,
          },
        });
      });
    });
  };
  await Promise.all([createMainPages(), createEventPage(), createPostPage()]);
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async ({
  actions,
}) => {
  const { createTypes } = actions;

  const schema = fs.readFileSync("./src/schema.gql", {
    encoding: "utf-8",
  });

  const gatsbySchema = fs.readFileSync("./src/gatsby-schema.gql", {
    encoding: "utf-8",
  });

  createTypes(schema + gatsbySchema);
};
