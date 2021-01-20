const mailchimp = require("@mailchimp/mailchimp_transactional")(
  process.env.MAILCHIMP_MANDRILL_KEY
);

module.exports = {
  callPing: async () => {
    try {
      // const response = await mailchimp.users.ping();
      // console.log(response);
      const response = await mailchimp.messages.send({
        message: {
          text: "html here",
          subject: "subject",
          from_email: "tgnemecek@gmail.com",
          to: ["tgnemecek@gmail.com"],
        },
      });
      console.log({ response });
    } catch (err) {
      console.error(`Error while retrieving products.`);
      throw err;
    }
  },
};
