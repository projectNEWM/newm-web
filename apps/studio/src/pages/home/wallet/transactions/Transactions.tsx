import { Stack, Typography } from "@mui/material";
import { formatToHumanReadableDate } from "@newm-web/utils";
import {
  Fragment,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MintingStatus, Song, SortOrder } from "@newm-web/types";
import moment from "moment";
import { EmptyTransactions } from "./EmptyTransactions";
import Transaction from "./Transaction";
import { TransactionType, TransactionsGroupedByDate } from "./types";
import AllCaughtUp from "../AllCaughtUp";
import { selectWallet, useGetEarningsQuery } from "../../../../modules/wallet";
import { useAppSelector } from "../../../../common";
import {
  useGetSongCountQuery,
  useGetSongsQuery,
} from "../../../../modules/song";
import TransactionSkeleton from "../../../../components/skeletons/TransactionSkeleton";

const Transactions: FunctionComponent = () => {
  const PAGE_LIMIT = 25;
  const [songsDataCollection, setSongsDataCollection] = useState<Song[]>([]);
  const [offset, setOffset] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { walletAddress = "" } = useAppSelector(selectWallet);
  const { data: earningsData, isLoading: isEarningsLoading } =
    useGetEarningsQuery(walletAddress, {
      skip: !walletAddress,
    });
  const { data: songsData, isLoading: isSongsLoading } = useGetSongsQuery({
    limit: PAGE_LIMIT,
    mintingStatuses: [MintingStatus.Minted],
    offset,
    sortOrder: SortOrder.Desc,
  });
  const { data: { count: totalCountOfSongs = 0 } = {} } = useGetSongCountQuery({
    mintingStatuses: [MintingStatus.Minted],
  });
  const totalGetSongPages = Math.ceil(totalCountOfSongs / PAGE_LIMIT);
  const claimedEarnings = earningsData?.earnings?.filter(
    (earning) => earning.claimed
  );

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const isScrolledToBottom = scrollTop >= scrollHeight - clientHeight;
    const shouldFetchMoreSongs =
      isScrolledToBottom &&
      !isFetchingMore &&
      !isSongsLoading &&
      offset / PAGE_LIMIT < totalGetSongPages - 1;

    if (shouldFetchMoreSongs) {
      setIsFetchingMore(true);
      setOffset(offset + PAGE_LIMIT);
    }
  };

  // Update the songs collection when new data is fetched
  useEffect(() => {
    if (!isSongsLoading && songsData) {
      setSongsDataCollection((prev) => {
        // Create a set of existing song ids to avoid duplicates
        const existingIds = new Set(prev.map((song) => song.id));

        // Filter out songs that already exist in the collection
        const newUniqueSongs = songsData.filter(
          (song) => !existingIds.has(song.id)
        );

        // Append new unique songs to the collection
        return [...prev, ...newUniqueSongs];
      });
      setIsFetchingMore(false);

      // Disable initial load skeletons after first fetch
      if (isInitialLoad) setIsInitialLoad(false);
    }
  }, [isInitialLoad, isSongsLoading, songsData]);

  // Combine and sort the transactions by date (latest first)
  const sortedTransactions = useMemo(() => {
    const claimedEarningsTransaction =
      claimedEarnings?.map((earning) => ({
        amount: earning.amount ?? 0,
        date: earning.claimedAt || "",
        id: earning.id ?? "",
        type: TransactionType.Claim,
      })) ?? [];
    const mintTransactions =
      songsDataCollection?.map((song) => ({
        amount: song.mintCostLovelace ?? 0,
        date: song.createdAt || "",
        id: song.id,
        subheading: song.title,
        type: TransactionType.Mint,
      })) ?? [];

    const combined = [...claimedEarningsTransaction, ...mintTransactions];

    // Merge and sort all transactions by date in descending order
    return combined.sort((a, b) => moment(b.date).diff(moment(a.date)));
  }, [claimedEarnings, songsDataCollection]);

  // Group transactions by date (YYYY-MM-DD)
  const transactionsGroupedByDate: TransactionsGroupedByDate = useMemo(() => {
    return sortedTransactions.reduce((groups, transaction) => {
      const transactionDate = moment(transaction.date).format("YYYY-MM-DD");

      if (!groups[transactionDate]) {
        groups[transactionDate] = [];
      }

      groups[transactionDate].push(transaction);

      return groups;
    }, {} as TransactionsGroupedByDate);
  }, [sortedTransactions]);

  // Check if all transactions have been loaded
  const isAllCaughtUp =
    !isFetchingMore &&
    !isSongsLoading &&
    offset / PAGE_LIMIT >= totalGetSongPages - 1;

  if (
    (!isEarningsLoading && !claimedEarnings?.length) ||
    (!isSongsLoading && !songsData?.length)
  ) {
    return <EmptyTransactions />;
  }

  return (
    <Stack
      sx={ { gap: 3, maxHeight: "60vh", mt: 3, overflow: "auto", pr: 1.5 } }
      onScroll={ handleScroll }
    >
      { isInitialLoad ? (
        <TransactionSkeleton count={ 15 } />
      ) : (
        <>
          { Object.keys(transactionsGroupedByDate).map((date) => (
            <Fragment key={ date }>
              <Typography textTransform="uppercase" variant="h4">
                { formatToHumanReadableDate(date) }
              </Typography>

              { transactionsGroupedByDate[date].map((transaction) => (
                <Transaction
                  amount={ transaction.amount }
                  date={ transaction.date }
                  key={ transaction.id }
                  subheading={ transaction.subheading }
                  type={ transaction.type }
                />
              )) }
            </Fragment>
          )) }
          { (isSongsLoading || isFetchingMore) && <TransactionSkeleton /> }
          { isAllCaughtUp && <AllCaughtUp /> }
        </>
      ) }
    </Stack>
  );
};

export default Transactions;
