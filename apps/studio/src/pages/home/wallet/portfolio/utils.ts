import { formatDateToISODateTime } from "@newm-web/utils";
import { TableDropdownMenuParameters } from "../../../../components";
import { PortfolioTableFilter } from "../../../../common";

/**
 * Calculates the start date based on the provided filter.
 *
 * @param {PortfolioTableFilter} filter - The filter to determine the start date.
 * @returns {string} The calculated start date in ISO format without milliseconds.
 */
export const calculateStartDate = (filter: PortfolioTableFilter): string => {
  const today = new Date();

  switch (filter) {
    case PortfolioTableFilter.Week:
      return formatDateToISODateTime(
        new Date(today.setDate(today.getDate() - 7))
      );
    case PortfolioTableFilter.Month:
      return formatDateToISODateTime(
        new Date(today.setMonth(today.getMonth() - 1))
      );
    case PortfolioTableFilter.Year:
      return formatDateToISODateTime(
        new Date(today.setFullYear(today.getFullYear() - 1))
      );
    case PortfolioTableFilter.All:
    default:
      return formatDateToISODateTime(new Date(0)); // Returns "1970-01-01T00:00:00"
  }
};

/**
 * An array of objects representing the royalty period filters for the table dropdown menu.
 *
 * @type {ReadonlyArray<TableDropdownMenuParameters>}
 */
export const royaltyPeriodFilters: ReadonlyArray<TableDropdownMenuParameters> =
  [
    { label: "Royalty Earnings: All Time", value: "all" },
    { label: "Royalty Earnings: Past Week", value: "week" },
    { label: "Royalty Earnings: Past Month", value: "month" },
    { label: "Royalty Earnings: Past Year", value: "year" },
  ];
