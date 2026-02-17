#!/usr/bin/env node
import "source-map-support/register";
import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { Construct } from "constructs";

const appName = process.env.APPNAME || "APPNAME";
const appNameAbbr = appName.replace(/-/g, "");
const qualifier = process.env.QUALIFIER || "UNDEFINED";
const gaMarketplaceId = process.env.NEXT_PUBLIC_GA_MARKETPLACE_ID;
const nxCloudAccessToken = process.env.NX_CLOUD_ACCESS_TOKEN;
const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING || "";
const launchDarklyClientId =
  process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING || "";
const dexHunterMarketplacePartnerCode =
  process.env.NEXT_PUBLIC_DEXHUNTER_MARKETPLACE_PARTNER_CODE || "";
const dexHunterToolsPartnerCode =
  process.env.NEXT_PUBLIC_DEXHUNTER_TOOLS_PARTNER_CODE || "";
const appEnv = process.env.NEXT_PUBLIC_ENV || "";
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
            NEXT_PUBLIC_DEXHUNTER_MARKETPLACE_PARTNER_CODE:
              dexHunterMarketplacePartnerCode,
            NEXT_PUBLIC_DEXHUNTER_TOOLS_PARTNER_CODE: dexHunterToolsPartnerCode,
            NEXT_PUBLIC_ENV: appEnv,
            NEXT_PUBLIC_GA_MARKETPLACE_ID: gaMarketplaceId,
            NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING: launchDarklyClientId,
            NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING: recaptchaKey,
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
