#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";

const appName = "Marketplace";
const qualifier = process.env.QUALIFIER || "UNDEFINED";
const rootDir = path.resolve(__dirname, "..", "..", "..", "..");

class WebPreviewStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.DockerImageFunction(this, "AssetFunction", {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(rootDir, "dist", "apps", "marketplace"),
        { workingDirectory: rootDir }
      ),
      memorySize: 1024,
    });
  }
}

const app = new cdk.App();
new WebPreviewStack(app, "WebPreviewStack", {
  stackName: `${appName}-${qualifier}`,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
