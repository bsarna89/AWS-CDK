import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStacks";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lamdaStack = new LambdaStack(app, "LambdaStack",{
    spacesTable: dataStack.spacesTable
});
new ApiStack(app, "ApiStack", {
  helloLambdaIntegration: lamdaStack.helloLambdaIntegration,
});
