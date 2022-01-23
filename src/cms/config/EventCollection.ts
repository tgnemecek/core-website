import { CmsCollection } from "netlify-cms-core";
import { EventPage } from "types";
import generateCmsSection from "./generate-cms-section";
import generateCmsField from "./generate-cms-field";

const EventCollection: CmsCollection = {
  name: "events",
  label: "Events",
  editor: {
    preview: false,
  },
  folder: "src/collections/events",
  create: true,
  slug: "{{year}}-{{month}}-{{day}}-{{title}}",
  fields: [
    generateCmsField<EventPage["collection"]>({
      label: "Collection",
      name: "collection",
      widget: "hidden",
      default: "events",
    }),
    generateCmsField<EventPage["id"]>({
      label: "id",
      name: "id",
      widget: "hidden",
    }),
    generateCmsField<EventPage["title"]>({
      label: "Title",
      name: "title",
      widget: "string",
      pattern: ["^.{3,80}$", "Must have between 3 and 80 characters"],
    }),
    generateCmsField<EventPage["subtitle"]>({
      label: "Subtitle",
      name: "subtitle",
      widget: "string",
    }),
    generateCmsField<EventPage["description"]>({
      label: "Description",
      name: "description",
      widget: "markdown",
    }),
    generateCmsField<EventPage["image"]>({
      label: "Image",
      name: "image",
      widget: "image",
    }),
    generateCmsField<EventPage["video"]>({
      label: "Video",
      name: "video",
      widget: "string",
      required: false,
    }),
    generateCmsField<EventPage["date"]>({
      label: "Date",
      name: "date",
      widget: "datetime",
      date_format: "D/MM/YYYY",
      time_format: "h:mma",
    }),
    generateCmsField<EventPage["duration"]>({
      label: "Duration (minutes)",
      name: "duration",
      widget: "number",
      min: 1,
      max: 99,
      default: 30,
      value_type: "int",
      step: 15,
    }),
    generateCmsField<EventPage["language"]>({
      label: "Language",
      name: "language",
      widget: "select",
      multiple: true,
      min: 1,
      default: ["EN"],
      options: [
        {
          label: "English",
          value: "EN",
        },
        {
          label: "Spanish",
          value: "ES",
        },
      ],
    }),
    generateCmsField<EventPage["isOnline"]>({
      label: "Online Event",
      name: "isOnline",
      widget: "boolean",
      default: true,
    }),
    generateCmsField<EventPage["location"]>({
      label: "Location (for in-person events)",
      name: "location",
      widget: "string",
      required: false,
    }),
    generateCmsSection<EventPage["tickets"][number]>({
      label: "Tickets",
      name: "tickets",
      widget: "list",
      allow_add: true,
      properties: {
        id: {
          label: "ID",
          widget: "hidden",
        },
        description: {
          label: "Description",
          widget: "string",
          default: "General Admission",
        },
        price: {
          label: "Price",
          widget: "number",
          default: 20,
        },
        endsOn: {
          label: "End of sale",
          widget: "select",
          default: "startOfEvent",
          options: [
            {
              label: "At the start of the event",
              value: "startOfEvent",
            },
            {
              label: "At the day of the event",
              value: "startOfDay",
            },
            {
              label: "1 week before the event",
              value: "oneWeek",
            },
          ],
        },
      },
    }),
  ],
};

export default EventCollection;
