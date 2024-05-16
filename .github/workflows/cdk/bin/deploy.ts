#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";

const appName = process.env.APPNAME || "APPNAME";
const appNameAbbr = appName.replace(/-/g, "");
const qualifier = process.env.QUALIFIER || "UNDEFINED";
const rootDir = path.resolve(__dirname, "..", "..", "..", "..");

class WebDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const deployFunction = new lambda.DockerImageFunction(
      this,
      "DeployFunction",
      {
        code: lambda.DockerImageCode.fromImageAsset(rootDir, {
          file: path.join("apps", appName, "Dockerfile"),
        }),
        memorySize: 1024,
      }
    );
  }
}

const app = new cdk.App();
new WebDeployStack(app, "WebDeployStack", {
  stackName: `${appName}-${qualifier}`,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
