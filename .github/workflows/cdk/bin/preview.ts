#!/usr/bin/env node
import "source-map-support/register";
import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

const appName = process.env.APPNAME || "APPNAME";
const appNameAbbr = appName.replace(/-/g, "");
const qualifier = process.env.QUALIFIER || "UNDEFINED";
const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING || "";
const rootDir = path.resolve(__dirname, "..", "..", "..", "..");

class WebPreviewStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const previewFunction = new lambda.DockerImageFunction(
      this,
      "PreviewFunction",
      {
        code: lambda.DockerImageCode.fromImageAsset(rootDir, {
          buildArgs: {
            NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING: recaptchaKey,
          },
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
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: `${appName}-${qualifier}`,
});
