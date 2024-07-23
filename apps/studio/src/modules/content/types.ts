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

interface FeatureFlags {
  readonly "claim-wallet-royalties-enabled": boolean;
  readonly "manage-marketplace-sales-enabled": boolean;
}

export interface GetStudioClientConfigResponse {
  "feature-flags": FeatureFlags;
}
