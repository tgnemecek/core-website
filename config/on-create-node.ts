import { createFilePath } from "gatsby-source-filesystem";
import { GatsbyNode } from "gatsby";

const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode }) => {
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
  }
};

export default onCreateNode;
