import Email from "./services/Email";
import { NetlifyLambdaHandler, ProcessEnvType } from "./types";

const { CONTACT_FORM_EMAIL } = process.env as ProcessEnvType;

type Body = {
  payload: {
    data: {
      name: string;
      email: string;
      message: string;
      page: string;
    };
  };
};

const contactForm: NetlifyLambdaHandler = async (event, context) => {
  try {
    const {
      payload: {
        data: { name, email, message, page },
      },
    }: Body = JSON.parse(event.body || "{}");

    const formattedMessage = message.replace(/\\n/g, "<br />");

    await Email.send({
      template: "contact-form-client",
      tags: {
        message: formattedMessage,
      },
      to: email,
    });

    await Email.send({
      template: "contact-form-core",
      tags: {
        name,
        email,
        page,
        message: formattedMessage,
      },
      to: CONTACT_FORM_EMAIL,
      replyTo: email,
    });

    return {
      statusCode: 200,
      body: "",
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};

module.exports.handler = contactForm;
