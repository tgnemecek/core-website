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

    console.log({
      name,
      email,
      message,
      page,
    });

    await Email.send({
      template: "contact-form-client",
      tags: {
        message,
      },
      to: email,
    });

    await Email.send({
      template: "contact-form-core",
      tags: {
        name,
        email,
        page,
        message,
      },
      to: CONTACT_FORM_EMAIL,
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
