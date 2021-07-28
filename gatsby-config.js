const path = require("path");
const { generateConfig } = require("gatsby-plugin-ts-config");

module.exports = generateConfig({
  configDir: "./config",
  babel: false,
  tsNode: true,
});
