export interface NetlifyContext {
  callbackWaitsForEmptyEventLoop: boolean;
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
  memoryLimitInMB: string;
  awsRequestId: string;
  logGroupName: string;
  logStreamName: string;
  identity: any;
  clientContext: any;
}

export interface NetlifyEvent {
  path: string;
  httpMethod: string;
  headers: { [key: string]: string };
  queryStringParameters: { [key: string]: string };
  body: string | null;
  isBase64Encoded: boolean;
}