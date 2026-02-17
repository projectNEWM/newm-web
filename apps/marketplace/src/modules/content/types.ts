/**
 * @deprecated Use Launch Darkly feature flags instead.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FeatureFlags {
  // When a feature flag is added it will have the following format:
  // readonly exampleFlag: boolean;
}

export interface GetStudioClientConfigResponse {
  readonly featureFlags: FeatureFlags;
}
