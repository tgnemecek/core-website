import { CmsConfig, CmsBackend } from "netlify-cms-core";
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
  "title" | "subtitle" | "isOnline" | "date" | "duration"
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
