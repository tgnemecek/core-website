const nodemailer = require("nodemailer");
const templates = require("../templates/index");

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

module.exports = {
  verify: async () => {
    try {
      await transporter.verify();
    } catch (err) {
      console.error(`Error while verifying email host.`);
      throw err;
    }
  },
  send: async (messageBody) => {
    console.log({
      test: templates.test(),
    });
    try {
      await transporter.sendMail({
        from: {
          name: "Sharon",
          address: EMAIL_USERNAME,
        },
        sender: EMAIL_USERNAME,
        to: "tgnemecek@gmail.com",
        subject: "Subject Here3",
        html: templates.test(),
      });
    } catch (err) {
      console.error(`Error while verifying email host.`);
      throw err;
    }
  },
};
