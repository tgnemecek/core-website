import { CmsConfig, CmsBackend } from "netlify-cms-core";

export type ExtendedConfig = Omit<CmsConfig, "backend"> & {
  backend: CmsBackend & {
    commit_messages: {
      create?: string;
      update?: string;
      delete?: string;
      uploadMedia?: string;
      deleteMedia?: string;
    };
  };
  load_config_file?: boolean;
};
