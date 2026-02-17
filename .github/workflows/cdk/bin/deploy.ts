#!/usr/bin/env node
import "source-map-support/register";
import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { Construct } from "constructs";
import { Tags } from "aws-cdk-lib";

const appName = process.env.APPNAME || "APPNAME";
const appId = process.env.APPID || "APPID";
const qualifier = process.env.QUALIFIER || "UNDEFINED";
const gaMarketplaceId = process.env.NEXT_PUBLIC_GA_MARKETPLACE_ID;
const nxCloudAccessToken = process.env.NX_CLOUD_ACCESS_TOKEN;
const launchDarklyClientIdProd =
  process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_PROD || "";
const launchDarklyClientIdStaging =
  process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING || "";
const dexHunterMarketplacePartnerCode =
  process.env.NEXT_PUBLIC_DEXHUNTER_MARKETPLACE_PARTNER_CODE || "";
const dexHunterToolsPartnerCode =
  process.env.NEXT_PUBLIC_DEXHUNTER_TOOLS_PARTNER_CODE || "";
const recaptchaKeyProd = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD || "";
const recaptchaKeyStaging =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING || "";
const appEnv = process.env.NEXT_PUBLIC_ENV || "";
const rootDir = path.resolve(__dirname, "..", "..", "..", "..");

class WebDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const deployFunction = new lambda.DockerImageFunction(
      this,
      "DeployFunction",
      {
        code: lambda.DockerImageCode.fromImageAsset(rootDir, {
          buildArgs: {
            NEXT_PUBLIC_DEXHUNTER_MARKETPLACE_PARTNER_CODE:
              dexHunterMarketplacePartnerCode,
            NEXT_PUBLIC_DEXHUNTER_TOOLS_PARTNER_CODE: dexHunterToolsPartnerCode,
            NEXT_PUBLIC_ENV: appEnv,
            NEXT_PUBLIC_GA_MARKETPLACE_ID: gaMarketplaceId,
            NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_PROD: launchDarklyClientIdProd,
            NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING:
              launchDarklyClientIdStaging,
            NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD: recaptchaKeyProd,
            NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING: recaptchaKeyStaging,
          },
          file: path.join("apps", appName, "Dockerfile"),
          platform: Platform.LINUX_AMD64,
        }),
        environment: {
          NX_CLOUD_ACCESS_TOKEN: nxCloudAccessToken,
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
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: `${appName}-${qualifier}`,
});
