import { APIGatewayEvent } from "aws-lambda";

type AcceptedInput = Omit<Partial<APIGatewayEvent>, "body"> & {
  body: any;
};

class MockAPIEvent implements APIGatewayEvent {
  constructor(partial?: AcceptedInput) {
    if (partial) {
      const input = partial;

      input.body = JSON.stringify(partial?.body);

      Object.assign(this, input);
    }
  }

  body = "";
  headers = {};
  multiValueHeaders = {};
  httpMethod = "POST";
  isBase64Encoded = false;
  path = "";
  pathParameters = {};
  queryStringParameters = {};
  multiValueQueryStringParameters = {};
  stageVariables = {};
  requestContext = {} as any;
  resource = {} as any;
}

export default MockAPIEvent;
