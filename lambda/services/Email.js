const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const mjml2html = require("mjml");

const { EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const options = {
  host: EMAIL_HOST,
  auth: {
    type: "login",
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
};

const defaults = {};

const transporter = nodemailer.createTransport(options, defaults);

const Email = {
  verify: async () => {
    try {
      await transporter.verify();
    } catch (err) {
      console.error(`Error while verifying email host.`);
      throw err;
    }
  },
  getPathToTemplate: (templateName) => {
    return path.join(__dirname, "..", "templates", `${templateName}.mjml`);
  },
  assembleSections: (template) => {
    const sections = ["head", "hero", "footer"];

    return sections.reduce((acc, cur) => {
      const pathToFile = Email.getPathToTemplate(cur);
      const file = fs.readFileSync(pathToFile, {
        encoding: "utf-8",
      });
      return acc.split(`{{${cur}}}`).join(file);
    }, template);
  },
  useTemplate: (templateName, tags) => {
    // Check if all required fields are provided
    const requiredMap = {
      "webinar-purchase": [
        "firstName",
        "webinarName",
        "webinarLink",
        "formattedDate",
        "googleCalendarLink",
      ],
    };

    const requiredTags = requiredMap[templateName];
    const invalid = requiredTags.filter((key) => !tags[key]);

    if (invalid.length > 0) {
      throw new Error(
        `Error in Email.useTemplate(). Required fields missing: ${invalid.join(
          ", "
        )}.`
      );
    }

    // Reads template file
    const pathToFile = Email.getPathToTemplate(templateName);

    const file = fs.readFileSync(pathToFile, {
      encoding: "utf-8",
    });

    // Replace tags
    const replaced = requiredTags.reduce((acc, cur) => {
      return acc.split(`{{${cur}}}`).join(tags[cur]);
    }, file);

    // Add sections
    const finalString = Email.assembleSections(replaced);

    const { html } = mjml2html(finalString);

    const subjectMap = {
      "webinar-purchase": "Here's your webinar link",
    };

    const subject = subjectMap[templateName];

    if (!subject) {
      throw new Error(
        `Webinar Subject not found. Check the provided template name: ${templateName}.`
      );
    }

    return { subject, html };
  },
  send: async (data) => {
    const { template, to, tags } = data;

    const required = ["template", "to", "tags"];
    const invalid = required.filter((key) => !data[key]);

    if (invalid.length > 0) {
      throw new Error(
        `Error in Email.send(). Required fields missing: ${invalid.join(", ")}.`
      );
    }

    const { html, subject } = Email.useTemplate(template, tags);

    try {
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
    } catch (err) {
      console.error(`Error while verifying email host.`);
      throw err;
    }
  },
};

module.exports = Email;
