import { ApiSale, Sale } from "./types";

/**
 * Creates a sale object from the sale API object with
 * the song.parentalAdvisory string field replaced with
 * a song.isExplicit boolean field.
 */
export const transformApiSale = (apiSale: ApiSale): Sale => {
  const {
    song: { parentalAdvisory, ...song },
    ...sale
  } = apiSale;

  return {
    ...sale,
    // TODO: look into back-end returning value with correct decimal places
    costAmount: sale.costAmount / 1000000,
    song: {
      ...song,
      isExplicit: parentalAdvisory === "Explicit",
    },
  };
};
