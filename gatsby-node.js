"use strict";

require("source-map-support").install();
require("ts-node").register();

exports.createPages = require("./config/create-pages").default;
exports.createSchemaCustomization =
  require("./config/create-schema-customization").default;
exports.onCreateNode = require("./config/on-create-node").default;
