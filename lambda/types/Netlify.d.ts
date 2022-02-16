import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export type NetlifyContext = Omit<Context, "clientContext"> & {
  clientContext: Context["clientContext"] & {
    identity?: any;
    user?: any;
  };
};

export type NetlifyLambdaHandler = (
  event: APIGatewayEvent,
  context: NetlifyContext,
  callback?: (arg1: any, arg2: any) => void
) => Promise<APIGatewayProxyResult>;
