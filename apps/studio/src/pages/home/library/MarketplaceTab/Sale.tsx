import { useParams } from "react-router-dom";
import { SaleStatus } from "@newm-web/types";
import { ActiveSale } from "./ActiveSale";
import { CreateSale } from "./CreateSale";
import { MarketplaceTabSkeleton } from "../../../../components";
import { useGetSalesQuery } from "../../../../modules/sale";
import { SongRouteParams } from "../types";

export const Sale = () => {
  const { songId } = useParams<"songId">() as SongRouteParams;
  const { data: sales = [], isLoading } = useGetSalesQuery({
    saleStatuses: [SaleStatus.Started],
    songIds: [songId],
  });

  if (isLoading) {
    return <MarketplaceTabSkeleton />;
  }

  return sales.length > 0 ? <ActiveSale /> : <CreateSale />;
};
