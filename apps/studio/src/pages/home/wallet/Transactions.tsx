import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { EmptyTransactions } from "./EmptyTransactions";
import AllCaughtUp from "./AllCaughtUp";

const Transactions: FunctionComponent = () => {
  const transactions = [];
  const isLoading = false;

  if (!isLoading && !transactions.length) {
    return <EmptyTransactions />;
  }

  return (
    <Box sx={ { pt: 1 } }>
      <AllCaughtUp />
    </Box>
  );
};
export default Transactions;
