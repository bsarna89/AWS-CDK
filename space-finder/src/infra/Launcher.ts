import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStacks";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";
import { MonitorStack } from "./stacks/MonitorStack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lamdaStack = new LambdaStack(app, "LambdaStack",{
    spacesTable: dataStack.spacesTable
});

const authSatck = new AuthStack(app,"AuthStack", {
   photosBucket: dataStack.photosBucket
} );

new ApiStack(app, "ApiStack", {
  spacesLambdaIntegration: lamdaStack.spacesLambdaIntegration,
  userPool: authSatck.userPool
});

new UiDeploymentStack(app, "UiDeploymentStack");
new MonitorStack(app, 'MonitorStack');
