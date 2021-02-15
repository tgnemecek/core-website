import head from "./head";
import hero from "./hero";
import footer from "./footer";

const meetingUpdate = `
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
          >The meeting: 
          <strong>{{meetingName}}</strong> has been
          updated.</mj-text
        >
        <mj-text
          align="center"
          font-size="18px"
          font-family="Arial"
          padding-top="20px"
          >Here&apos;s the updated time:</mj-text
        >
        <mj-text
          align="center"
          color="#489BDA"
          font-size="25px"
          font-family="Arial, sans-serif"
          font-weight="bold"
          line-height="35px"
          padding-bottom="20px"
          >{{formattedDate}}
        </mj-text>
        <mj-button
        background-color="#315cb0"
        color="white !important"
        href="{{meetingLink}}"
        font-family="Arial, sans-serif"
        padding="0 0 20px 0"
        font-weight="bold"
        font-size="16px"
        >Join Meeting</mj-button
      >
        <mj-text align="center" font-size="18px" font-family="Arial"
          >If you are unable to attend, please let us know by replying to this
          email.</mj-text
        >
        <mj-button
          align="center"
          font-size="13px"
          font-family="Arial"
          padding-top="40px"
          background-color="transparent"
          color="#315cb0 !important"
          border="1px solid #315cb0"
          href="{{googleCalendarLink}}"
          >Add to Google Calendar</mj-button
        >
        <mj-text
          align="center"
          color="#000000"
          font-size="14px"
          font-family="Arial, sans-serif"
          padding-top="40px"
          >See you then! <br />
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

export default meetingUpdate;
