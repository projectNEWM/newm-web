import { OnUploadProgress } from "@newm-web/types";

export interface CloudinaryUploadOptions {
  readonly eager?: string;
}

export interface CloudinaryUploadParams extends CloudinaryUploadOptions {
  readonly api_key: string;
  readonly file: string | ArrayBuffer | null;
  readonly onUploadProgress?: OnUploadProgress;
  readonly signature: string;
  readonly timestamp: number;
}

export interface CloudinaryUploadResponse {
  readonly api_key: string;
  readonly asset_id: string;
  readonly bytes: number;
  readonly created_at: string;
  readonly eager?: ReadonlyArray<{
    readonly bytes: number;
    readonly format: string;
    readonly height: number;
    readonly secure_url: string;
    readonly transformation: string;
    readonly url: string;
    readonly width: number;
  }>;
  readonly etag: string;
  readonly format: string;
  readonly height: number;
  readonly placeholder: boolean;
  readonly public_id: string;
  readonly resource_type: string;
  readonly secure_url: string;
  readonly signature: string;
  readonly tags: ReadonlyArray<string>;
  readonly type: string;
  readonly url: string;
  readonly version: number;
  readonly version_id: string;
  readonly width: number;
}
