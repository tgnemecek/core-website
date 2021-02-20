import nodemailer from "nodemailer";
import mjml2html from "mjml";
import Core from "./Core";
import {
  meetingCancelTemplate,
  meetingPurchaseTemplate,
  meetingRefundTemplate,
  meetingUpdateTemplate,
} from "../templates";
import { ProcessEnvType } from "../types";

type TemplateSettingsType = Record<
  "meeting-purchase" | "meeting-update" | "meeting-cancel" | "meeting-refund",
  {
    template: string;
    tags: TagType[];
    subject: string;
    hasCalendarLink?: boolean;
    dateFormatter: (
      startDate?: moment.Moment,
      endDate?: moment.Moment
    ) => string | undefined;
  }
>;

type TagType =
  | "firstName"
  | "meetingName"
  | "meetingLink"
  | "startDate"
  | "endDate";

type TagMap = {
  firstName?: string;
  meetingName?: string;
  meetingLink?: string;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
};

type FormattedTagMap = TagMap & {
  formattedDate: string | undefined;
  googleCalendarLink?: string;
};

type SendProps = {
  template: keyof TemplateSettingsType;
  to: string | string[];
  tags: TagMap;
};

const {
  EMAIL_HOST,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
} = process.env as ProcessEnvType;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  auth: {
    type: "login",
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

const templateSettings: TemplateSettingsType = {
  "meeting-purchase": {
    template: meetingPurchaseTemplate,
    tags: ["firstName", "meetingName", "meetingLink", "startDate", "endDate"],
    subject: "Here's your event link",
    hasCalendarLink: true,
    dateFormatter: (startDate) =>
      `${startDate?.format("h:mm A")} on ${startDate?.format("MM/DD/YYYY")}`,
  },
  "meeting-update": {
    template: meetingUpdateTemplate,
    tags: ["firstName", "meetingName", "meetingLink", "startDate", "endDate"],
    subject: "Event updated",
    hasCalendarLink: true,
    dateFormatter: (startDate, endDate) =>
      `${startDate?.format("MMM D, YYYY")}<br/>${startDate?.format(
        "h:mm A"
      )} - ${endDate?.local().format("h:mm A")}`,
  },
  "meeting-cancel": {
    template: meetingCancelTemplate,
    tags: ["firstName", "meetingName"],
    subject: "Event cancelled",
    hasCalendarLink: false,
    dateFormatter: () => undefined,
  },
  "meeting-refund": {
    template: meetingRefundTemplate,
    tags: ["firstName", "meetingName"],
    subject: "Event refunded",
    hasCalendarLink: false,
    dateFormatter: () => undefined,
  },
};

const useTemplate = (
  templateName: keyof TemplateSettingsType,
  tagMap: TagMap
) => {
  // Check if all required fields are provided
  const requiredTags = templateSettings[templateName].tags;
  const invalid = requiredTags.filter((key) => !tagMap[key]);

  if (invalid.length > 0) {
    throw new Error(
      `Error in useTemplate(). Required fields missing: ${invalid.join(", ")}.`
    );
  }

  const {
    subject,
    hasCalendarLink,
    dateFormatter,
    template,
  } = templateSettings[templateName];

  const formattedTags: FormattedTagMap = {
    ...tagMap,
    formattedDate: dateFormatter(tagMap.startDate, tagMap.endDate),
    googleCalendarLink: hasCalendarLink
      ? Core.generateCalendarLink({
          title: tagMap.meetingName!,
          description: `Please join at the time of the event using your unique and personal link: ${tagMap.meetingLink}`,
          startDate: tagMap.startDate!,
          endDate: tagMap.endDate!,
        })
      : undefined,
  };

  // Replace tags
  const replaced = (Object.keys(
    formattedTags
  ) as (keyof FormattedTagMap)[]).reduce((acc, key) => {
    return acc.split(`{{${key}}}`).join(formattedTags[key]?.toString());
  }, template);

  const { html } = mjml2html(replaced);

  if (!subject) {
    throw new Error(
      `Webinar Subject not found. Check the provided template name: ${templateName}.`
    );
  }

  return { subject, html };
};

const Email = {
  ping: async () => {
    try {
      await transporter.verify();
      return true;
    } catch (err) {
      throw new Error("Email servers are down");
    }
  },
  send: async (props: SendProps) => {
    const { template, to, tags } = props;

    const required: (keyof SendProps)[] = ["template", "to", "tags"];
    const invalid = required.filter((key) => !props[key]);

    if (invalid.length > 0) {
      throw new Error(
        `Error in Email.send(). Required fields missing: ${invalid.join(", ")}.`
      );
    }

    const { html, subject } = useTemplate(template, tags);

    await transporter.sendMail({
      from: {
        name: "CORE Team",
        address: EMAIL_USERNAME,
      },
      sender: EMAIL_USERNAME,
      to,
      subject,
      html,
    });
  },
};

export default Email;
