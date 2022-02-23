import fs from "fs";
import { GatsbyNode } from "gatsby";

const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  async ({ actions }) => {
    const { createTypes } = actions;

    const schema = fs.readFileSync("./src/schema.gql", {
      encoding: "utf-8",
    });

    const gatsbySchema = fs.readFileSync("./src/gatsby-schema.gql", {
      encoding: "utf-8",
    });

    createTypes(schema + gatsbySchema);
  };

export default createSchemaCustomization;
