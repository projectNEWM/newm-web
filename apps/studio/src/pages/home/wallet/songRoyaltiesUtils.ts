import { Song } from "@newm-web/types";

interface EarningsData {
  amount: number;
  createdAt: number;
}

interface WalletSongsEarningsData {
  earningsData: ReadonlyArray<EarningsData>;
  song: Song;
}

// create record with the number of days for royalty period filter option
const royaltyPeriodFilterDays: Record<string, number> = {
  All: 0,
  Week: 604800000,
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  Month: 2592000000,
  Year: 31536000000,
};

export const isWithinFilterPeriod = (
  royaltiesCreatedDate: number | undefined,
  walletPortfolioTableFilter: string
) => {
  const filterPeriod = royaltyPeriodFilterDays[walletPortfolioTableFilter];
  if (walletPortfolioTableFilter === "All") {
    return true;
  } else if (royaltiesCreatedDate) {
    return royaltiesCreatedDate >= Date.now() - filterPeriod;
  } else {
    return false;
  }
};

/** TODO: This is a temporary function to generate test (claimed and unclaimed)
 * royalty earnings for the given wallet songs. Song title length is used as a
 * temp unique differentiator to generate royalties. The song title length
 * conditionals are in place of the backend earnings table query. The current
 * assumption is that the query will be for one song ID and return each earning
 * event in individual objects within an array.
 */
export const createTempSongEarningsQueryData = (
  song: Song
): WalletSongsEarningsData => {
  const tempRoyaltyAmount = 0.01;
  // use song title length as a unique differentiator to generate royalties
  if (song.title.length % 2 === 0) {
    return {
      earningsData: [
        {
          amount: tempRoyaltyAmount + song.title.length,
          createdAt: Date.now() - royaltyPeriodFilterDays["Week"],
        },
        {
          amount: tempRoyaltyAmount + song.title.length,
          createdAt: Date.now() - royaltyPeriodFilterDays["Month"],
        },
        {
          amount: tempRoyaltyAmount + song.title.length,
          createdAt: Date.now() - royaltyPeriodFilterDays["Year"],
        },
        {
          amount: tempRoyaltyAmount + song.title.length,
          createdAt: Date.now() - royaltyPeriodFilterDays["Year"] - 60000,
        },
      ],
      song,
    };
  } else {
    // Return empty array for songs with no Royalties
    return {
      earningsData: [],
      song,
    };
  }
};
