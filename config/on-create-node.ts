import { createFilePath } from "gatsby-source-filesystem";
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
      "/business/": {
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

export default onCreateNode;
