import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { useWindowDimensions } from "@newm-web/utils";
import { Box } from "@mui/material";
import { TableSkeleton } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import SongRoyaltiesList, { TotalSongRoyalty } from "./SongRoyaltiesList";
import { EmptyPortfolio } from "./EmptyPortfolio";
import {
  createTempSongRoyaltyQuery,
  isWithinFilterPeriod,
} from "./songRoyaltiesUtils";
import { useGetUserWalletSongsThunk } from "../../../modules/song";
import { useAppSelector } from "../../../common";
import { selectUi } from "../../../modules/ui";

const Portfolio: FunctionComponent = () => {
  const windowHeight = useWindowDimensions()?.height;
  const windowWidth = useWindowDimensions()?.width;
  const maxListWidth = 700;
  const SKELETON_PADDING = 200;
  const ROW_HEIGHT = 50;
  const DEFAULT_ROWS = 10;
  const MIN_ROWS = 1;
  const skeletonRef = useRef<HTMLDivElement>();
  const [skeletonRows, setSkeletonRows] = useState<number>(10);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [page, setPage] = useState(1);
  const pageIdx = page - 1;
  const lastRowOnPage = pageIdx * rowsPerPage + rowsPerPage;

  const { wallet } = useConnectWallet();
  const [
    getUserWalletSongs,
    { data: walletSongsResponse, isLoading, isSuccess },
  ] = useGetUserWalletSongsThunk();

  const songs = useMemo(
    () => walletSongsResponse?.data?.songs?.map((entry) => entry.song) || [],
    [walletSongsResponse?.data?.songs]
  );

  const [walletSongsRoyaltyCombined, setWalletSongsRoyaltyCombined] = useState<
    TotalSongRoyalty[]
  >([]);

  const { walletPortfolioTableFilter } = useAppSelector(selectUi);

  useEffect(() => {
    // Pagination was removed as Song creation date is not used as sorting criteria
    getUserWalletSongs({});
  }, [getUserWalletSongs, wallet]);

  useEffect(() => {
    const skeletonYPos = skeletonRef.current?.offsetTop || 0;

    const rowsToRender = windowHeight
      ? Math.max(
          Math.floor(
            (windowHeight - skeletonYPos - SKELETON_PADDING) / ROW_HEIGHT
          ),
          MIN_ROWS
        )
      : DEFAULT_ROWS;

    setSkeletonRows(rowsToRender);
    setRowsPerPage(rowsToRender);

    // TODO: Creates temporary earnings in place of backend table query
    const walletSongsEarnings = songs.map((song) =>
      createTempSongRoyaltyQuery(song)
    );

    const combinedEarnings = walletSongsEarnings
      .map((songEarning) => {
        const totalRoyaltyAmount = songEarning.earningsData
          // filter out earnings that are not within the filter period
          .filter((songEarning) =>
            isWithinFilterPeriod(
              songEarning.createdAt,
              walletPortfolioTableFilter
            )
          )
          // combine earnings within the filter period
          .reduce((acc, curr) => acc + curr.amount, 0);
        return {
          song: songEarning.song,
          totalRoyaltyAmount,
        };
      })
      // Sort filtered songs by descending totalRoyaltyAmount
      .sort((a, b) => b?.totalRoyaltyAmount - a?.totalRoyaltyAmount)
      // handle pagination for song earnings
      .slice(pageIdx * skeletonRows, pageIdx * skeletonRows + rowsToRender);

    setWalletSongsRoyaltyCombined(combinedEarnings);
  }, [pageIdx, skeletonRows, songs, walletPortfolioTableFilter, windowHeight]);

  if (isLoading) {
    return (
      <TableSkeleton
        cols={ windowWidth && windowWidth > theme.breakpoints.values.sm ? 3 : 2 }
        maxWidth={ maxListWidth }
        rows={ skeletonRows }
      />
    );
  }

  if (isSuccess && songs?.length === 0) {
    return <EmptyPortfolio />;
  }

  return (
    <Box mt={ 2 } pb={ 8 } pt={ 2 } ref={ skeletonRef }>
      <SongRoyaltiesList
        lastRowOnPage={ lastRowOnPage }
        page={ page }
        rows={ walletSongsRoyaltyCombined.length }
        rowsPerPage={ rowsPerPage }
        setPage={ setPage }
        songRoyalties={ walletSongsRoyaltyCombined }
        totalCountOfSongs={ walletSongsResponse?.data?.total || 0 }
      />
    </Box>
  );
};

export default Portfolio;
