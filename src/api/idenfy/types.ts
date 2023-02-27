export interface IdenfyTokenRequest {
  readonly clientId: string;
  readonly additionalData?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  readonly additionalSteps?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  readonly address?: string | null;
  readonly callbackUrl?: string;
  readonly country?: string | null;
  readonly dateOfBirth?: string | null;
  readonly dateOfExpiry?: string | null;
  readonly dateOfIssue?: string | null;
  readonly documentNumber?: string | null;
  readonly documents?: string[];
  readonly errorUrl?: string;
  readonly expiryTime?: number;
  readonly externalRef?: string | null;
  readonly firstName?: string;
  readonly generateDigitString?: boolean;
  readonly lastName?: string;
  readonly locale?:
    | "lt"
    | "en"
    | "ru"
    | "pl"
    | "lv"
    | "ro"
    | "it"
    | "de"
    | "fr"
    | "sv"
    | "es"
    | "hu"
    | "ja"
    | "bg"
    | "et"
    | "cs"
    | "nl"
    | "pt"
    | "uk"
    | "vi"
    | "sk";
  readonly nationality?: string | null;
  readonly personalNumber?: string | null;
  readonly questionnaire?: string;
  readonly sessionLength?: number;
  readonly sex?: "M" | "F";
  readonly showInstructions?: boolean;
  readonly successUrl?: string;
  readonly tokenType?:
    | "DOCUMENT"
    | "IDENTIFICATION"
    | "VIDEO_CALL"
    | "VIDEO_CALL_PHOTOS"
    | "VIDEO_CALL_IDENTIFICATION";
  readonly unverifiedUrl?: string;
  readonly utilityBill?: boolean;
  readonly videoCallQuestions?: string[];
}

export interface IdenfyTokenResponse {
  readonly authToken: string;
  readonly clientId: string;
  readonly message: string;
  readonly scanRef: string;
  readonly digitString?: string;
}
