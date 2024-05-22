#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";
import { Tags } from "aws-cdk-lib";

const appName = process.env.APPNAME || "APPNAME";
const appId = process.env.APPID || "APPID";
const appNameAbbr = appName.replace(/-/g, "");
const qualifier = process.env.QUALIFIER || "UNDEFINED";
const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING || "";
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
        environment: {
          NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING: recaptchaKey,
        },
        memorySize: 1024,
      }
    );

    new ssm.StringParameter(this, "SsmDeployFunctionArn", {
      parameterName: `/cdk/${qualifier}/NewmWeb/${appId}FunctionArn`,
      stringValue: deployFunction.functionArn,
    });
  }
}

const app = new cdk.App();
const deployStack = new WebDeployStack(app, "WebDeployStack", {
  stackName: `${appName}-${qualifier}`,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
