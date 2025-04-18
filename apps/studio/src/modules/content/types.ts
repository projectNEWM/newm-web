export interface Genre {
  readonly genre_id: number;
  readonly name: string;
}

export interface Role {
  readonly name: string;
  readonly role_id: number;
}

export interface Language {
  readonly language_code: string;
  readonly language_name: string;
}

interface State {
  readonly state_code: string;
  readonly state_name: string;
}

export interface Country {
  readonly country_code: string;
  readonly country_name: string;
  readonly state?: State[];
}

/**
 * @deprecated Use Launch Darkly feature flags instead.
 */
interface FeatureFlags {
  readonly claimWalletRoyaltiesEnabled: boolean;
  readonly manageMarketplaceSalesEnabled: boolean;
}

export interface GetStudioClientConfigResponse {
  readonly featureFlags: FeatureFlags;
}
