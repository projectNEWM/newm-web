import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import Sales from "./Sales";
import { useGetSalesQuery } from "../modules/sale/api";

const RecentSongs: FunctionComponent = () => {
  const { data, isLoading } = useGetSalesQuery({
    limit: 8,
    sortOrder: "desc",
  });

  return (
    <Box mt={ [7.5, 5.5, 10] }>
      <Sales isLoading={ isLoading } sales={ data } title="JUST RELEASED" />
    </Box>
  );
};

export default RecentSongs;
