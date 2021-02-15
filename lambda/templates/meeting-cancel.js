const head = require("./head");
const hero = require("./hero");
const footer = require("./footer");

module.exports = `
<mjml>
  ${head}
  <mj-body background-color="#bedae6">
    ${hero}
    <mj-section padding-bottom="20px" padding-top="10px">
      <mj-column>
        <mj-text
          align="center"
          padding="10px 25px"
          font-size="20px"
          color="#512d0b"
          ><strong>Hello {{firstName}},</strong></mj-text
        >
        <mj-text align="center" font-size="18px" font-family="Arial"
          >We're sorry to inform you that the
          <strong>{{meetingName}}</strong> meeting has been cancelled.</mj-text
        >
        <mj-text
          align="center"
          font-size="18px"
          font-family="Arial"
          padding-top="20px"
          >Your refund has already been processed and it should reflect in your
          statement in a few days.</mj-text
        >
        <mj-text
          align="center"
          font-size="18px"
          font-family="Arial"
          padding-top="20px"
          >We're sorry for the inconvenience and we hope your interest in our
          work continues.</mj-text
        >
        <mj-text
          align="center"
          color="#000000"
          font-size="14px"
          font-family="Arial, sans-serif"
          padding-top="40px"
          >Sincerely, <br />
          The
          <a
            href="https://www.corecoachingconsulting.com"
            style="
              color: #489bda !important;
              text-decoration: underline !important;
            "
            target="_blank"
            >Core Coaching Consulting</a
          >
          Team
        </mj-text>
        ${footer}
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
