import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { SaleStatus } from "@newm-web/types";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale/api";

const RecentSongs: FunctionComponent = () => {
  const { data, isLoading } = useGetSalesQuery({
    limit: 8,
    saleStatuses: [SaleStatus.Started],
    sortOrder: "desc",
  });

  return (
    <Box mt={ [7.5, 5.5, 10] }>
      <Sales isLoading={ isLoading } sales={ data } title="JUST RELEASED" />
    </Box>
  );
};

export default RecentSongs;
