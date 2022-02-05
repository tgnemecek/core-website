import path from "path";
import { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  const createMainPages = async () => {
    const { data, errors } = await graphql(`
      {
        allMarkdownRemark(filter: { frontmatter: { isPage: { eq: true } } }) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                template
              }
            }
          }
        }
      }
    `);

    if (errors) return console.error(errors);

    (data as any).allMarkdownRemark.edges.forEach(({ node }: any) => {
      const {
        id,
        fields: { slug },
        frontmatter: { template },
      } = node;
      createPage({
        path: slug === "/landing/" ? "/" : slug,
        component: path.resolve(`src/templates/${template}/index.tsx`),
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

export default createPages;
