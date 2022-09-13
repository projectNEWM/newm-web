import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Typography } from "elements";
import { List, ListItem, ListItemText } from "@mui/material";
import theme from "theme";
import { Transaction, mockTransactions, useWindowDimensions } from "common";
import { Box } from "@mui/system";
import SkeletonTable from "elements/skeletons/TableSkeleton";

const TransactionsList: FunctionComponent = () => {
  const { data = [], isLoading, isSuccess } = mockTransactions;
  const transactionData: Transaction[] = data;

  const windowHeight = useWindowDimensions()?.height;
  const windowWidth = useWindowDimensions()?.width;
  const [listHeight, setListHeight] = useState<number>();
  const maxListWidth = 700;

  const listRef = useRef<HTMLDivElement>();
  const skeletonRef = useRef<HTMLDivElement>();
  const listYPos = listRef && listRef.current?.offsetTop;
  const skeletonYPos = skeletonRef && skeletonRef.current?.offsetTop;
  const [skeletonRows, setSkeletonRows] = useState<number>(10);

  useEffect(() => {
    setListHeight(windowHeight && listYPos ? windowHeight - listYPos : 550);
    setSkeletonRows(
      windowHeight && skeletonYPos
        ? Math.floor((windowHeight - skeletonYPos - 200) / 50)
        : 10
    );
  }, [windowHeight, listYPos, skeletonYPos]);

  const groupTransactionsBy = (
    transactions: Array<Transaction>,
    key: keyof Transaction
  ): Record<string, Array<Transaction>> => {
    return transactions.reduce((result, item) => {
      const group = item[key] as string;

      result[group] ||= [];
      result[group].push(item);

      return result;
    }, {} as Record<string, Array<Transaction>>);
  };

  const transactionsByDate = Object.values(
    groupTransactionsBy(transactionData, "date")
  );

  return isSuccess && !isLoading ? (
    <Box
      ref={ listRef }
      overflow="scroll"
      maxHeight={ listHeight && listHeight - 20 }
      maxWidth={ maxListWidth }
    >
      { transactionsByDate.map((transactions, idx) => (
        <Box key={ idx }>
          <Typography
            fontWeight={ 600 }
            fontSize={ 12 }
            sx={ { pb: 1, pt: 4 } }
            align="left"
          >
            { transactions[0].date.slice(4, 10).toUpperCase() }
          </Typography>
          <TransactionGroup transactions={ transactions } />
          <hr
            style={ {
              background: theme.colors.grey500,
              border: "none",
              height: "1px",
              margin: 0,
            } }
          />
        </Box>
      )) }
    </Box>
  ) : (
    <Box ref={ skeletonRef }>
      <SkeletonTable
        cols={ windowWidth && windowWidth > theme.breakpoints.values.sm ? 3 : 2 }
        rows={ skeletonRows }
        maxWidth={ maxListWidth }
      />
    </Box>
  );
};

interface TransactionGroupProps {
  transactions: Transaction[];
}

const TransactionGroup: FunctionComponent<TransactionGroupProps> = ({
  transactions,
}) => {
  const getResizedTransactionImageUrl = (url: string | undefined) => {
    if (!url) {
      return "";
    } else if (url.split("/")[2] == "res.cloudinary.com") {
      return url.replace("upload/", "upload/c_fill,q_auto,f_auto/");
    } else {
      return url;
    }
  };

  return (
    <Box pb={ 1 }>
      { transactions.map((transaction, idx) => (
        <List key={ idx } sx={ { width: "100%" } }>
          <ListItem disablePadding sx={ { height: 32 } }>
            <img
              style={ {
                borderRadius: "4px",
                marginRight: 12,
                height: 32,
                width: 32,
              } }
              src={ getResizedTransactionImageUrl(transaction.iconImgUrl) }
              alt="Transaction"
            />
            <ListItemText
              primaryTypographyProps={ {
                fontSize: "12px",
                fontWeight: 500,
                pt: 1.5,
                lineHeight: "15px",
              } }
              secondaryTypographyProps={ {
                fontSize: "12px",
                fontWeight: 500,
                color: theme.colors.grey200,
                pb: 1,
              } }
              primary={ transaction.description }
              secondary={ transaction.time.slice(0, 5) }
            />
            <ListItemText
              sx={ { textAlign: "end" } }
              primaryTypographyProps={ {
                fontSize: "12px",
                fontWeight: 700,
                pr: 2,
              } }
              primary={ "$" + transaction.amount }
            />
          </ListItem>
        </List>
      )) }
    </Box>
  );
};
export default TransactionsList;
