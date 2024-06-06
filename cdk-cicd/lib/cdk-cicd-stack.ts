import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, "AwsomePipeline", {
      pipelineName: "AwsomePipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("bsarna89/AWS-CDK", "main"),
        commands: ["cd cdk-cicd", "npm ci", "npx cdk synth"],
        primaryOutputDirectory: "cdk-cicd/cdk.out",
      }),
    });
  }
}
