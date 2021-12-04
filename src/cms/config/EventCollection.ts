import { CmsCollection } from "netlify-cms-core";

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
    {
      label: "Collection",
      name: "collection",
      widget: "hidden",
      default: "events",
    },
    {
      label: "id",
      name: "id",
      widget: "hidden",
    },
    {
      label: "Title",
      name: "title",
      widget: "string",
      pattern: ["^.{3,80}$", "Must have between 3 and 80 characters"],
    },
    {
      label: "Subtitle",
      name: "subtitle",
      widget: "string",
    },
    {
      label: "Description",
      name: "description",
      widget: "markdown",
    },
    {
      label: "Image",
      name: "image",
      widget: "image",
    },
    {
      label: "Video",
      name: "video",
      widget: "string",
      required: false,
    },
    {
      label: "Date",
      name: "date",
      widget: "datetime",
      date_format: "D/MM/YYYY",
      time_format: "h:mma",
    },
    {
      label: "Duration (minutes)",
      name: "duration",
      widget: "number",
      min: 1,
      max: 99,
      default: 30,
      value_type: "int",
      step: 15,
    },
    {
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
    },
    {
      label: "Online Event",
      name: "isOnline",
      widget: "boolean",
      default: true,
    },
    {
      label: "Location (for in-person events)",
      name: "location",
      widget: "string",
      required: false,
    },
    {
      label: "Tickets",
      name: "tickets",
      widget: "list",
      allow_add: true,
      fields: [
        {
          label: "ID",
          name: "id",
          widget: "hidden",
          default: "",
        },
        {
          label: "Description",
          name: "description",
          widget: "string",
          default: "General Admission",
        },
        {
          label: "Price",
          name: "price",
          widget: "number",
          default: 20,
        },
        {
          label: "End of sale",
          name: "endsOn",
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
        {
          label: "Extra information",
          name: "extra",
          widget: "string",
          required: false,
        },
      ],
    },
  ],
};

export default EventCollection;
