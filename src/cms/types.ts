import { FC } from "react";
import { CmsConfig, CmsBackend, CmsField } from "netlify-cms-core";
import { Event } from "types";

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

export type CustomWidgetProps<ValueType = string> = {
  classNameWrapper: string;
  forID: string;
  value?: ValueType;
  onChange: (value?: ValueType) => void;
};

export type CustomWidget<ValueType = string> = FC<CustomWidgetProps<ValueType>>;

export type Form = Pick<
  Event,
  "id" | "title" | "subtitle" | "tickets" | "isOnline" | "date" | "duration"
>;
