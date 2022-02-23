import { CmsConfig, CmsBackend, CmsFieldBase } from "netlify-cms-core";
import { Event, Ticket } from "types";

export type ExtendedCMSConfig = Omit<CmsConfig, "backend"> & {
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

export type Entry<Form = Record<string, any>> = {
  getIn: (data: ["data"]) => {
    toJS: () => Form;
  };
};

export type EventForm = Pick<
  Event,
  "title" | "subtitle" | "date" | "duration"
> & {
  id?: string;
  tickets: (Omit<Ticket, "id"> & {
    id?: string;
  })[];
};

export type EventServerResponse = {
  id: string;
  tickets: Ticket[];
};

export type TypeSafeCmsField<T, Cms> = Omit<CmsFieldBase & Cms, "required"> &
  (undefined extends T
    ? {
        required: false;
      }
    : {});
