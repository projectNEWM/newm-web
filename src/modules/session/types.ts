export interface SessionState {
  isLoggedIn: boolean;
  profile: Profile;
  verificationPingStartedAt?: number;
  isLoading: boolean;
}

export interface Profile {
  readonly id: string;
  readonly oauthType: string;
  readonly oauthId: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly nickname: string;
  readonly pictureUrl?: string;
  readonly bannerUrl?: string;
  readonly location?: string;
  readonly role: string;
  readonly genre: string;
  readonly verificationStatus: Readonly<VerificationStatus>;
  readonly biography: string;
  readonly websiteUrl: string;
  readonly twitterUrl: string;
  readonly instagramUrl: string;
  readonly companyIpRights: boolean;
  readonly companyName?: string;
  readonly companyLogoUrl?: string;
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
  readonly bannerUrl?: string;
  readonly companyLogoUrl?: string;
  readonly location?: string;
  readonly role?: string;
  readonly genre?: string;
  readonly email?: string;
  readonly newPassword?: string;
  readonly confirmPassword?: string;
  readonly authCode?: number;
  readonly verificationStatus?: Readonly<VerificationStatus>;
}

export interface ProfileFormValues
  extends Omit<
    UpdateProfileRequest,
    "pictureUrl" | "bannerUrl" | "companyLogoUrl"
  > {
  readonly pictureUrl?: File;
  readonly bannerUrl?: File;
  readonly companyLogoUrl?: File;
}

export type GetProfileResponse = Profile;

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
  readonly verificationStatus?: Readonly<VerificationStatus>;
}

export interface ResetPasswordRequest {
  readonly authCode: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly newPassword: string;
}

export interface IdenfyTokenResponse {
  readonly authToken: string;
  readonly expiryTime: number;
}

export enum VerificationStatus {
  Verified = "Verified",
  Pending = "Pending",
  Unverified = "Unverified",
}
