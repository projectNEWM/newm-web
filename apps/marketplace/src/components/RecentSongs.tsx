import { Box } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { SaleStatus } from "@newm-web/types";
import Sales from "./Sales";
import { useGetSaleCountQuery, useGetSalesQuery } from "../modules/sale/api";

const RecentSongs: FunctionComponent = () => {
  const requestSize = 8;
  const [numSales, setNumSales] = useState(requestSize);

  const { data: saleData = [], isFetching } = useGetSalesQuery({
    limit: numSales,
    saleStatuses: [SaleStatus.Started],
    sortOrder: "desc",
  });

  const { data: saleCountData } = useGetSaleCountQuery({
    saleStatuses: [SaleStatus.Started],
  });

  const hasMore = !!saleCountData?.count && saleCountData?.count > numSales;

  const numSkeletons = saleCountData?.count
    ? Math.min(saleCountData.count - saleData.length, requestSize)
    : requestSize;

  /**
   * Increment the sales query limit to fetch
   * additional sales.
   */
  const handleLoadMore = () => {
    setNumSales((current) => current + requestSize);
  };

  return (
    <Box mt={ [7.5, 5.5, 10] }>
      <Sales
        hasMore={ hasMore }
        isLoading={ isFetching }
        numSkeletons={ numSkeletons }
        sales={ saleData }
        title="JUST RELEASED"
        onLoadMore={ handleLoadMore }
      />
    </Box>
  );
};

export default RecentSongs;
