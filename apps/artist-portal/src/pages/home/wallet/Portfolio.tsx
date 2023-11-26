import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "@newm.io/studio/common";
import { Box } from "@mui/material";
import SkeletonTable from "@newm.io/studio/components/skeletons/TableSkeleton";
import theme from "@newm.io/theme";
import { SortOrder, useGetUserWalletSongsThunk } from "@newm.io/studio/modules/song";
import SongRoyaltiesList from "./SongRoyaltiesList";

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

  const [getUserWalletSongs, { data: walletSongsResponse, isLoading }] = useGetUserWalletSongsThunk();

  const songs = walletSongsResponse?.data?.songs?.map((entry) => entry.song) || [];

  useEffect(() => {
    getUserWalletSongs({
      offset: pageIdx * skeletonRows,
      limit: skeletonRows,
      sortOrder: SortOrder.Desc,
    });
  }, [getUserWalletSongs, pageIdx, skeletonRows]);

  useEffect(() => {
    const skeletonYPos = skeletonRef.current?.offsetTop || 0;

    const rowsToRender = windowHeight
      ? Math.max(Math.floor((windowHeight - skeletonYPos - SKELETON_PADDING) / ROW_HEIGHT), MIN_ROWS)
      : DEFAULT_ROWS;

    setSkeletonRows(rowsToRender);
    setRowsPerPage(rowsToRender);
  }, [windowHeight]);

  return (
    <Box ref={ skeletonRef } pt={ 2 } pb={ 8 }>
      { isLoading ? (
        <SkeletonTable
          cols={ windowWidth && windowWidth > theme.breakpoints.values.sm ? 3 : 2 }
          rows={ skeletonRows }
          maxWidth={ maxListWidth }
        />
      ) : (
        <SongRoyaltiesList
          songRoyalties={ songs }
          rows={ songs.length }
          page={ page }
          rowsPerPage={ rowsPerPage }
          lastRowOnPage={ lastRowOnPage }
          setPage={ setPage }
          totalCountOfSongs={ walletSongsResponse?.data?.total || 0 }
        />
      ) }
    </Box>
  );
};

export default Portfolio;
