interface FeatureFlags {
  // This is a test flag and does not exist. It is only to setup the structure. delete it after adding a real flag.
  readonly testFlag: boolean;
}

export interface GetStudioClientConfigResponse {
  readonly featureFlags: FeatureFlags;
}
