import { IdenfyTokenResponse } from "api";

export interface SessionState {
  isLoggedIn: boolean;
  profile: Profile;
  idenfy: Partial<IdenfyTokenResponse>;
}

export interface Profile {
  readonly id: string;
  readonly oauthType: string;
  readonly oauthId: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly nickname: string;
  readonly pictureUrl: string;
  readonly role: string;
  readonly genre: string;
  readonly verifiedStatus: "unverified" | "pending" | "verified";
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

export interface UpdateProfileRequest {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly nickname?: string;
  readonly pictureUrl?: string;
  readonly role?: string;
  readonly genre?: string;
  readonly email?: string;
  readonly newPassword?: string;
  readonly confirmPassword?: string;
  readonly authCode?: number;
  readonly verifiedStatus?: "unverified" | "pending" | "verified";
}

export interface GetProfileResponse {
  readonly id: string;
  readonly oauthType: string;
  readonly oauthId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly nickname: string;
  readonly pictureUrl: string;
  readonly role: string;
  readonly genre: string;
  readonly email: string;
  readonly verifiedStatus: "unverified" | "pending" | "verified";
}

export interface Request2FACode {
  readonly email: string;
}

export interface CreateAccountRequest {
  readonly authCode: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly firstName?: string;
  readonly genre?: string;
  readonly lastName?: string;
  readonly newPassword: string;
  readonly nickname?: string;
  readonly pictureUrl?: string;
  readonly role?: string;
  readonly verifiedStatus?: "unverified" | "pending" | "verified";
}

export interface ResetPasswordRequest {
  readonly authCode: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly newPassword: string;
}
