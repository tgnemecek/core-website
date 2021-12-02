import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export type NetlifyContext = Omit<Context, "clientContext"> & {
  clientContext: Context["clientContext"] & {
    identity?: any;
    user?: any;
  };
};

export type NetlifyLambdaHandler = (
  event: APIGatewayEvent,
  context: NetlifyContext
) => Promise<APIGatewayProxyResult>;
