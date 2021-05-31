import { head, hero, footer } from "./components";

const contactFormClient = `
<mjml>
  ${head}
  <mj-body background-color="#bedae6">
    ${hero}
    <mj-section padding-bottom="20px" padding-top="10px">
      <mj-column>
        <mj-text align="center" padding="10px 25px" font-size="20px" color="#512d0b"><strong>Thank you for your message!</strong></mj-text>
        <mj-text align="center" padding="10px 25px" font-size="20px" color="#512d0b">We'll reply shortly. Here's a copy of your message:</mj-text>
        <mj-text font-size="18px" font-family="Arial">
          <strong>{{message}}</strong>
        </mj-text>
        ${footer}
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export default contactFormClient;
