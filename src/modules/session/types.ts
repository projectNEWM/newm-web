export interface NewmOAuthRequest {
  readonly accessToken?: string;
  readonly code?: string;
}

export interface NewmAuthResponse {
  readonly token: string;
}
