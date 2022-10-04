import { RootState } from "store";
import { SaleBundle } from "./types";

export const selectSale = (state: RootState): RootState["sale"] => {
  return state.sale;
};

export const selectSalesFor =
  (projectId: number) =>
  (state: RootState): ReadonlyArray<SaleBundle> => {
    return state.sale.sales.filter(hasProjectId(projectId));
  };

const hasProjectId = (projectId: number) => (sale: SaleBundle) => {
  return sale.projectId === projectId;
};
