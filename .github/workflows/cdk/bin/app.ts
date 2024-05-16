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

class WebPreviewStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const previewFunction = new lambda.DockerImageFunction(
      this,
      "PreviewFunction",
      {
        code: lambda.DockerImageCode.fromImageAsset(rootDir, {
          file: path.join("apps", appName, "Dockerfile"),
        }),
        memorySize: 1024,
      }
    );
    const lambdaFuncUrl = previewFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
    new cdk.CfnOutput(this, "CfnOutputFunctionUrl", {
      key: `${appNameAbbr}${qualifier}FunctionUrl`,
      value: lambdaFuncUrl.url,
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
