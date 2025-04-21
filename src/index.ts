// import awsLambdaFastify from "@fastify/aws-lambda";
// import init from "./app";

// const proxy = awsLambdaFastify(init());
// // or
// // const proxy = awsLambdaFastify(init(), { binaryMimeTypes: ['application/octet-stream'] })

// exports.handler = proxy;

import awsLambdaFastify from "@fastify/aws-lambda";
import init from "./app";

let proxy: any; // cached Lambda handler
exports.handler = async (event: any, context: any) => {
  if (!proxy) {
    const app = await init();
    proxy = awsLambdaFastify(app);
  }

  return proxy(event, context);
};
