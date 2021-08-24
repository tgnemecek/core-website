import { ExtendedConfig } from "../types";
import PageCollection from "./PageCollection";
import EventCollection from "./EventCollection";
import SettingsCollection from "./SettingsCollection";
import PostCollection from "./PostCollection";

const config: ExtendedConfig = {
  backend: {
    name: "git-gateway",
    branch: process.env.GATSBY_NETLIFY_CMS_BRANCH,
    commit_messages: {
      create: "Create {{collection}} “{{slug}}”",
      update: "Update {{collection}} “{{slug}}”",
      delete: "Delete {{collection}} “{{slug}}”",
      uploadMedia: "[skip ci] Upload “{{path}}”",
      deleteMedia: "[skip ci] Delete “{{path}}”",
    },
  },
  load_config_file: false,
  media_folder: "static/img",
  public_folder: "/img",
  media_library: {
    name: "cloudinary",
    config: {
      cloud_name: process.env.GATSBY_CLOUDINARY_NAME,
      api_key: process.env.GATSBY_CLOUDINARY_API,
    },
  },
  collections: [
    PageCollection,
    EventCollection,
    PostCollection,
    SettingsCollection,
  ],
};

export default config;
