import { head, hero, footer } from "./components";

const contactFormCore = `
<mjml>
  ${head}
  <mj-body background-color="#bedae6">
    ${hero}
    <mj-section padding-bottom="20px" padding-top="10px">
      <mj-column>
        <mj-text align="center" padding="10px 25px" font-size="20px" color="#512d0b">
          <strong>You received a new message!</strong>
        </mj-text>
        <mj-text font-size="18px" font-family="Arial line-height="2">Name:
          <strong>{{name}}</strong>
        </mj-text>
        <mj-text font-size="18px" font-family="Arial" line-height="2">Email:
          <strong>{{email}}</strong>
        </mj-text>
        <mj-text font-size="18px" font-family="Arial" line-height="2">Message:</mj-text>
        <mj-text font-size="18px" font-family="Arial" line-height="2" padding-left="15px">
          <strong>{{message}}</strong>
        </mj-text>
        ${footer}
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export default contactFormCore;
