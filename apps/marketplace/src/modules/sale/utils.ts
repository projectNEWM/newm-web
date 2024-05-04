import { ApiSale, Sale } from "./types";

/**
 * Removes song.parentalAdvisory string field from sale API object
 * and replaces it with song.isExplicit boolean field.
 * @param apiSale
 * @returns
 */
export const transformApiSale = (apiSale: ApiSale): Sale => {
  const {
    song: { parentalAdvisory, ...song },
    ...sale
  } = apiSale;

  return {
    ...sale,
    song: {
      ...song,
      isExplicit: parentalAdvisory === "Explicit",
    },
  };
};
