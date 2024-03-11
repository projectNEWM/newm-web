import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useWindowDimensions } from "@newm-web/utils";
import { Box } from "@mui/material";
import { TableSkeleton } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { Song } from "@newm-web/types";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import SongRoyaltiesList, { SongRoyalties } from "./SongRoyaltiesList";
import { EmptyPortfolio } from "./EmptyPortfolio";
import { useGetUserWalletSongsThunk } from "../../../modules/song";

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

  const [songRoyalties, setSongRoyalties] = useState<SongRoyalties[]>([]);
  /* TODO: This is a temporary function to generate test royalties for the 
  songs. Song title length is used as a temp unique differentiator to generate 
  royalties. The song title length conditionals will be replaced with data from 
  the backend earnings table. */
  const createTempSongRoyalties = useCallback(
    (songs: Song[], rowsToRender: number): SongRoyalties[] => {
      const testDateFilter = new Date(2024, 0, 1);
      const tempRoyaltyAmount = 0.35;
      return songs
        .map((song) => {
          if (song.title.length % 2 === 0) {
            return {
              royaltyAmount: tempRoyaltyAmount + song.title.length,
              royaltyCreatedAt: new Date(
                testDateFilter.getTime() +
                  Math.random() * (Date.now() - testDateFilter.getTime())
              ).getTime(),
              song,
            };
          } else {
            // Return 0 for songs with no Royalties, temp use odd song title lengths
            return {
              royaltyAmount: 0,
              song,
            };
          }
        })
        .sort((a, b) => b?.royaltyAmount - a?.royaltyAmount)
        .slice(pageIdx * skeletonRows, pageIdx * skeletonRows + rowsToRender);
    },
    [pageIdx, skeletonRows]
  );

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
    // TODO: Temp to handle pagination for Song Royalties
    setSongRoyalties(createTempSongRoyalties(songs, rowsToRender));
  }, [createTempSongRoyalties, songs, windowHeight]);

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
        rows={ songRoyalties.length }
        rowsPerPage={ rowsPerPage }
        setPage={ setPage }
        songRoyalties={ songRoyalties }
        totalCountOfSongs={ walletSongsResponse?.data?.total || 0 }
      />
    </Box>
  );
};

export default Portfolio;
