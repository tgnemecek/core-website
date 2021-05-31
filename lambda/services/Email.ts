import nodemailer from "nodemailer";
import mjml2html from "mjml";
import Core from "./Core";
import {
  meetingCancelTemplate,
  meetingPurchaseTemplate,
  meetingRefundTemplate,
  meetingUpdateTemplate,
  contactFormCore,
  contactFormClient,
} from "../templates";
import { ProcessEnvType } from "../types";

type TagMap = {
  firstName: string;
  meetingName: string;
  meetingLink: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  name: string;
  email: string;
  message: string;
  page: string;
};

type FormattedTagMap = TagMap & {
  formattedDate: string | undefined;
  googleCalendarLink?: string;
};

type Tags<T extends keyof TemplateSettingsType> = Pick<
  TagMap,
  TemplateSettingsType[T]["tags"][number]
>;

type SendProps<T extends keyof TemplateSettingsType> = {
  template: T;
  to: string | string[];
  tags: Tags<T>;
};

const {
  EMAIL_HOST,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_REPLY_TO,
} = process.env as ProcessEnvType;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  auth: {
    type: "login",
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

const templateSettings = {
  "meeting-purchase": {
    template: meetingPurchaseTemplate,
    tags: ["firstName", "meetingName", "meetingLink", "startDate", "endDate"],
    subject: "Here's your event link",
    hasCalendarLink: true,
    dateFormatter: (startDate: moment.Moment) =>
      `${startDate?.format("h:mm A (z)")} on ${startDate?.format(
        "MM/DD/YYYY"
      )}`,
  },
  "meeting-update": {
    template: meetingUpdateTemplate,
    tags: ["firstName", "meetingName", "meetingLink", "startDate", "endDate"],
    subject: "Event updated",
    hasCalendarLink: true,
    dateFormatter: (startDate: moment.Moment, endDate: moment.Moment) =>
      `${startDate?.format("MMM D, YYYY")}<br/>${startDate?.format(
        "h:mm A"
      )} - ${endDate?.format("h:mm A (z)")}`,
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
  "contact-form-core": {
    template: contactFormCore,
    tags: ["name", "email", "message", "page"],
    subject: "Contact Form",
    hasCalendarLink: false,
    dateFormatter: () => undefined,
  },
  "contact-form-client": {
    template: contactFormClient,
    tags: ["message"],
    subject: "Contact Form Sent",
    hasCalendarLink: false,
    dateFormatter: () => undefined,
  },
} as const;

type TemplateSettingsType = typeof templateSettings;

const useTemplate = <T extends keyof TemplateSettingsType>(
  templateName: T,
  tags: Tags<T>
) => {
  // Check if all required fields are provided
  const requiredTags = templateSettings[templateName].tags;
  const invalid = (requiredTags as readonly (keyof Tags<T>)[]).filter(
    (key) => !tags[key]
  );

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

  const genericTags = tags as TagMap;

  const formattedTags: FormattedTagMap = {
    ...genericTags,
    formattedDate: dateFormatter(genericTags.startDate, genericTags.endDate),
    googleCalendarLink: hasCalendarLink
      ? Core.generateCalendarLink({
          title: genericTags.meetingName,
          description: `Please join at the time of the event using your unique and personal link: ${genericTags.meetingLink}`,
          startDate: genericTags.startDate,
          endDate: genericTags.endDate,
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
  send: async <T extends keyof TemplateSettingsType>(props: SendProps<T>) => {
    const { template, to, tags } = props;

    const required: (keyof SendProps<T>)[] = ["template", "to", "tags"];
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
      replyTo: EMAIL_REPLY_TO,
      subject,
      html,
    });
  },
};

export default Email;
