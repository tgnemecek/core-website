import { createFilePath } from "gatsby-source-filesystem";
import { GatsbyNode } from "gatsby";

const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent || "");
    const { sourceInstanceName } = (parent as any) || {};

    createNodeField({
      node,
      name: `id`,
      value: node.id,
    });

    createNodeField({
      node,
      name: `slug`,
      value: createFilePath({ node, getNode }),
    });

    createNodeField({
      node,
      name: `collection`,
      value: sourceInstanceName,
    });

    const { template } = node.frontmatter as Record<string, string | undefined>;

    createNodeField({
      node,
      name: `template`,
      value: template,
    });

    if (sourceInstanceName === "page") {
      createNodeField({
        node,
        name: template,
        value: node.frontmatter,
      });
    } else {
      createNodeField({
        node,
        name: sourceInstanceName,
        value: node.frontmatter,
      });
    }
  }
};

export default onCreateNode;
