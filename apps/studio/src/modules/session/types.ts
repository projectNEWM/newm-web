export interface SessionState {
  isLoggedIn: boolean;
  verificationPingStartedAt?: number;
}

export interface Profile {
  readonly id: string;
  readonly oauthType: string;
  readonly oauthId: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly nickname?: string;
  readonly pictureUrl?: string;
  readonly bannerUrl?: string;
  readonly location?: string;
  readonly role: string;
  readonly genre?: string;
  readonly verificationStatus: Readonly<VerificationStatus>;
  readonly walletAddress?: string;
  readonly biography?: string;
  readonly websiteUrl?: string;
  readonly twitterUrl?: string;
  readonly instagramUrl?: string;
  readonly companyIpRights: boolean;
  readonly companyName?: string;
  readonly companyLogoUrl?: string;
  readonly spotifyProfile?: string;
  readonly soundCloudProfile?: string;
  readonly appleMusicProfile?: string;
}

export interface GetUserRequest {
  readonly userId: string;
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

export interface ProfileFormValues
  extends Omit<
    Profile,
    | "id"
    | "oauthType"
    | "oauthId"
    | "verificationStatus"
    | "pictureUrl"
    | "bannerUrl"
    | "companyLogoUrl"
    | "companyIpRights"
    | "email"
    | "role"
    | "firstName"
    | "lastName"
  > {
  readonly pictureUrl?: string | File;
  readonly bannerUrl?: string | File;
  readonly companyIpRights?: boolean;
  readonly companyLogoUrl?: string | File;
  readonly email?: string;
  readonly role?: string;
  readonly firstName?: string;
  readonly lastName?: string;
}

export interface UpdateProfileRequest extends Omit<ProfileFormValues, "email"> {
  readonly newPassword?: string;
  readonly confirmPassword?: string;
  readonly authCode?: number;
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

export interface CreateAccountResponse {
  userId: string;
}

export interface DeleteAccountRequest {
  readonly id: string;
}

export interface ResetPasswordRequest {
  readonly authCode: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly newPassword: string;
}

export interface ChangePasswordRequest {
  readonly currentPassword: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}

export interface IdenfyTokenResponse {
  readonly authToken: string;
  readonly expiryTime: number;
}

export interface LinkedInLoginRequest {
  readonly code: string;
  readonly redirectUri: string;
}

export enum VerificationStatus {
  Verified = "Verified",
  Pending = "Pending",
  Unverified = "Unverified",
}
