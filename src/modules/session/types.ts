export interface SessionState {
  isLoggedIn: boolean;
  errorMessage: string;
}

export interface NewmOAuthRequest {
  readonly accessToken?: string;
  readonly code?: string;
  readonly redirectUri?: string;
}

export interface NewmAuthResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

export interface DecodedJwt {
  readonly aud: string;
  readonly sub: string;
  readonly iss: string;
  readonly exp: number;
  readonly type: string;
  readonly jti: string;
}
