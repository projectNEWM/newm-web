import { FunctionComponent } from "react";
import { EmptyTransactions } from "./EmptyTransactions";

const Transactions: FunctionComponent = () => {
  const transactions = [];
  const isLoading = false;

  if (!isLoading && !transactions.length) {
    return <EmptyTransactions />;
  }

  return <div>Transactions</div>;
};
export default Transactions;
