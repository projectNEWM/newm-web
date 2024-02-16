import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "@newm-web/utils";
import { Box } from "@mui/material";
import { TableSkeleton } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { SortOrder } from "@newm-web/types";
import SongRoyaltiesList from "./SongRoyaltiesList";
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

  const [getUserWalletSongs, { data: walletSongsResponse, isLoading }] =
    useGetUserWalletSongsThunk();

  const songs =
    walletSongsResponse?.data?.songs?.map((entry) => entry.song) || [];

  useEffect(() => {
    getUserWalletSongs({
      limit: skeletonRows,
      offset: pageIdx * skeletonRows,
      sortOrder: SortOrder.Desc,
    });
  }, [getUserWalletSongs, pageIdx, skeletonRows]);

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
  }, [windowHeight]);

  return (
    <Box pb={ 8 } pt={ 2 } ref={ skeletonRef }>
      { isLoading ? (
        <TableSkeleton
          cols={
            windowWidth && windowWidth > theme.breakpoints.values.sm ? 3 : 2
          }
          maxWidth={ maxListWidth }
          rows={ skeletonRows }
        />
      ) : (
        <SongRoyaltiesList
          lastRowOnPage={ lastRowOnPage }
          page={ page }
          rows={ songs.length }
          rowsPerPage={ rowsPerPage }
          setPage={ setPage }
          songRoyalties={ songs }
          totalCountOfSongs={ walletSongsResponse?.data?.total || 0 }
        />
      ) }
    </Box>
  );
};

export default Portfolio;
