import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Action } from "aws-cdk-lib/aws-appconfig";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps extends StackProps {
  spacesTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly spacesLambdaIntegration: LambdaIntegration;
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const spacesLambda = new NodejsFunction(this, "SpacesLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "spaces", "handler.ts"),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
      tracing: Tracing.ACTIVE,
      timeout: Duration.minutes(1)
    });
    

    // const helloLambda = new NodejsFunction(this, "HelloLambda", {
    //   runtime: Runtime.NODEJS_18_X,
    //   handler: "handler",
    //   entry: join(__dirname, "..", "..", "services", "hello.ts"),
    //   environment: {
    //     TABLE_NAME: props.spacesTable.tableName,
    //   },
    // });
    // helloLambda.addToRolePolicy(
    //   new PolicyStatement({
    //     effect: Effect.ALLOW,
    //     actions: ["s3:ListAllMyBuckets", "s3:ListBuckets"],
    //     resources: ["*"],
    //   })
    // );

    spacesLambda.addToRolePolicy(new PolicyStatement({
       effect: Effect.ALLOW,
       resources: [props.spacesTable.tableArn],
       actions:[
          'dynamodb:PutItem',
          'dynamodb:Scan',
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"  
       ]
    }))

    this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda);
  }
}
