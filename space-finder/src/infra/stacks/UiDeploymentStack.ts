import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";
import { join } from "path";
import { existsSync } from "fs";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";

export class UiDeploymentStack extends Stack{

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);


        const suffix = getSuffixFromStack(this);
    
        const deploymentsBucket = new Bucket(this, "uiDeploymentBucket",{
            bucketName: `space-finder-frontend-${suffix}`,
        })

        const uiDir = join(__dirname, "..", "..", "..", "..", "react-space-finder", "dist");

        if(!existsSync(uiDir)){
            console.warn("DIR not found" + uiDir);
            return;
        }

        new BucketDeployment(this, "SpaceFinderBucketDelpoyment",{
            destinationBucket: deploymentsBucket,
            sources: [Source.asset(uiDir)]
        });

        const orignIdentity = new OriginAccessIdentity(this, "OriginAccesIdentity");
        deploymentsBucket.grantRead(orignIdentity);

        const distribution = new Distribution(this, "SpacesDistribution", {
            defaultRootObject: "index.html",
            defaultBehavior: {
                origin: new S3Origin(deploymentsBucket, {
                    originAccessIdentity: orignIdentity,
                })
            }
        });

        new CfnOutput(this, "SpaceFinderUrl", {
            value: distribution.distributionDomainName
        })

    }


}