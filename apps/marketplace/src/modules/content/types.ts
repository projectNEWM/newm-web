// eslint-disable-next-line
interface FeatureFlags {
  // When a feature flag is added it will have the following format:
  // readonly exampleFlag: boolean;
}

export interface GetStudioClientConfigResponse {
  readonly featureFlags: FeatureFlags;
}
