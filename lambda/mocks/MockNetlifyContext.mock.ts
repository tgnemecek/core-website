import { NetlifyContext } from "../types/Netlify";

class MockNetlifyContext implements NetlifyContext {
  constructor(partial?: NetlifyContext) {
    if (partial) {
      Object.assign(this, partial);
    }
  }

  callbackWaitsForEmptyEventLoop = false;
  functionName = "";
  functionVersion = "";
  invokedFunctionArn = "";
  memoryLimitInMB = "";
  awsRequestId = "";
  logGroupName = "";
  logStreamName = "";
  getRemainingTimeInMillis = () => 0;
  done = () => null;
  fail = () => null;
  succeed = () => null;
  clientContext = {
    user: "Mock User",
  } as any;
}

export default MockNetlifyContext;
