export interface SessionState {
  isLoggedIn: boolean;
  verificationPingStartedAt?: number;
}

export interface Profile {
  readonly appleMusicProfile?: string;
  readonly bannerUrl?: string;
  readonly biography?: string;
  readonly companyIpRights: boolean;
  readonly companyLogoUrl?: string;
  readonly companyName?: string;
  readonly dspPlanSubscribed?: boolean;
  readonly email: string;
  readonly firstName: string;
  readonly genre?: string;
  readonly id: string;
  readonly instagramUrl?: string;
  readonly ipi?: string;
  readonly isni?: string;
  readonly lastName: string;
  readonly location?: string;
  readonly nickname?: string;
  readonly oauthId: string;
  readonly oauthType: string;
  readonly pictureUrl?: string;
  readonly role: string;
  readonly soundCloudProfile?: string;
  readonly spotifyProfile?: string;
  readonly twitterUrl?: string;
  readonly verificationStatus: Readonly<VerificationStatus>;
  readonly walletAddress?: string;
  readonly websiteUrl?: string;
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
  readonly exp: number;
  readonly iss: string;
  readonly jti: string;
  readonly sub: string;
  readonly type: string;
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
  readonly bannerUrl?: string | File;
  readonly companyIpRights?: boolean;
  readonly companyLogoUrl?: string | File;
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly pictureUrl?: string | File;
  readonly role?: string;
}

export interface UpdateProfileRequest extends Omit<ProfileFormValues, "email"> {
  readonly authCode?: number;
  readonly confirmPassword?: string;
  readonly newPassword?: string;
}

export type GetProfileResponse = Profile;

export interface Request2FACode {
  readonly email: string;
  readonly mustExists?: boolean;
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
  readonly confirmPassword: string;
  readonly currentPassword: string;
  readonly newPassword: string;
}

export interface IdenfyTokenResponse {
  readonly authToken: string;
  readonly expiryTime: number;
}

export enum VerificationStatus {
  Pending = "Pending",
  Unverified = "Unverified",
  Verified = "Verified",
}
