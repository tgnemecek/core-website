import { createFilePath } from "gatsby-source-filesystem";
import { GatsbyNode } from "gatsby";

const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField, deleteNode, createNode } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent || "");
    const { sourceInstanceName } = (parent as any) || {};

    node.fields = {
      slug: createFilePath({ node, getNode }),
      collection: sourceInstanceName,
    };

    const { template } = node.frontmatter as Record<string, string | undefined>;

    if (template) {
      node.frontmatter = {
        isPage: true,
        template,
        pages: {
          [template]: node.frontmatter,
        },
      };
    } else {
      (node.frontmatter as any)[sourceInstanceName] = node.frontmatter;
    }

    // deleteNode(node);
    // createNode({
    //   ...node,
    //   fields: {
    //     slug: createFilePath({ node, getNode }),
    //   },
    //   ...(parent?.sourceInstanceName
    //     ? {
    //         frontmatter: {
    //           [parent.sourceInstanceName as string]: node.frontmatter,
    //         },
    //       }
    //     : null),
    // });
    // createNodeField({
    //   name: "slug",
    //   node,
    //   value: createFilePath({ node, getNode }),
    // });

    // console.log(node);

    // createNodeField({
    //   name: "slug",
    //   node,
    //   value: createFilePath({ node, getNode }),
    // });
  }

  // if (node.internal.type === "MarkdownRemark") {
  //   const pageMap = {
  //     "/": {
  //       key: "landing",
  //       component: "LandingPage",
  //     },
  //     "/coaching/": {
  //       key: "services",
  //       component: "ServicePage",
  //     },
  //     "/leading/": {
  //       key: "services",
  //       component: "ServicePage",
  //     },
  //     "/learning/": {
  //       key: "services",
  //       component: "ServicePage",
  //     },
  //     "/business/": {
  //       key: "services",
  //       component: "ServicePage",
  //     },
  //     "/team/": {
  //       key: "team",
  //       component: "TeamPage",
  //     },
  //     "/legal/": {
  //       key: "legal",
  //       component: "LegalPage",
  //     },
  //   } as const;

  //   const value = createFilePath({ node, getNode }) as keyof typeof pageMap;

  //   const { frontmatter } = node as any;

  //   if (frontmatter.collection === "pages") {
  //     const { key, component } = pageMap[value];
  //     createNodeField({
  //       name: "slug",
  //       node: {
  //         ...node,
  //         frontmatter: {
  //           component,
  //           pages: {
  //             [key]: {
  //               ...frontmatter,
  //             },
  //           },
  //           collection: frontmatter.collection,
  //         },
  //       },
  //       value,
  //     });
  //   } else {
  //     createNodeField({
  //       name: "slug",
  //       node: {
  //         ...node,
  //         frontmatter: {
  //           [frontmatter.collection]: node.frontmatter,
  //           collection: frontmatter.collection,
  //         },
  //       },
  //       value,
  //     });
  //   }
  // }
};

export default onCreateNode;
