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
      label: "Template",
      name: "template",
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
      widget: "hidden",
      default: true,
    },
    {
      label: "Tickets",
      name: "tickets",
      widget: "list",
      allow_add: true,
      fields: [
        {
          label: "ID",
          widget: "hidden",
          name: "id",
        },
        {
          label: "Description",
          widget: "string",
          default: "General Admission",
          name: "description",
        },
        {
          label: "Price",
          widget: "number",
          name: "price",
          default: 20,
        },
        {
          label: "End of sale",
          widget: "select",
          default: "startOfEvent",
          name: "endsOn",
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
      ],
    },
  ],
};

export default EventCollection;
