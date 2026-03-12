// * Tentative type definition for releases.
// eslint-disable-next-line max-len
// * based on: https://github.com/projectNEWM/newm-server/blob/master/newm-server/src/main/kotlin/io/newm/server/features/song/model/Release.kt

import { MintingStatus } from "@newm-web/types";

export interface Release {
  readonly archived?: boolean | null;
  readonly barcodeNumber?: string | null;
  readonly barcodeType?: string | null;
  readonly coverArtUrl?: string | null;
  readonly createdAt?: string | null;
  readonly errorMessage?: string | null;
  readonly genres?: string[] | null;
  readonly hasSubmittedForDistribution?: boolean | null;
  readonly id: string;
  readonly locked?: boolean | null;
  readonly mintingStatus?: MintingStatus | null;
  readonly ownerId?: string | null;
  readonly publicationDate?: string | null;
  readonly releaseDate?: string | null;
  readonly releaseType?: string | null;
  readonly title?: string | null;
  readonly totalTracksLength?: number | null;
}
