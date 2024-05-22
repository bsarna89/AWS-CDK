import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStacks";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lamdaStack = new LambdaStack(app, "LambdaStack",{
    spacesTable: dataStack.spacesTable
});

const authSatck = new AuthStack(app,"AuthStack" );

new ApiStack(app, "ApiStack", {
  spacesLambdaIntegration: lamdaStack.spacesLambdaIntegration,
  userPool: authSatck.userPool
});

new UiDeploymentStack(app, "UiDeploymentStack");
