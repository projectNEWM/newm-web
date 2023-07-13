import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "common";
import { Box } from "@mui/material";
import SkeletonTable from "components/skeletons/TableSkeleton";
import theme from "theme";
import { SortOrder, useGetSongsQuery } from "modules/song";
import SongRoyaltiesList from "./SongRoyaltiesList";

const Portfolio: FunctionComponent = () => {
  const windowHeight = useWindowDimensions()?.height;
  const windowWidth = useWindowDimensions()?.width;
  const maxListWidth = 700;
  const skeletonRef = useRef<HTMLDivElement>();
  const skeletonYPos = skeletonRef.current?.offsetTop || 0;
  const [skeletonRows, setSkeletonRows] = useState<number>(10);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [page, setPage] = useState(1);
  const pageIdx = page - 1;
  const lastRowOnPage = pageIdx * rowsPerPage + rowsPerPage;

  // TODO: replace this with actual API query for song royalty data
  const { data: songs = [], isLoading } = useGetSongsQuery({
    ownerIds: ["me"],
    offset: pageIdx * skeletonRows,
    limit: skeletonRows,
    sortOrder: SortOrder.Desc,
  });

  useEffect(() => {
    const rowsToRender = windowHeight
      ? Math.floor((windowHeight - skeletonYPos - 200) / 50)
      : 10;

    setSkeletonRows(rowsToRender);
    setRowsPerPage(rowsToRender);
  }, [windowHeight, skeletonYPos]);

  return (
    <Box ref={ skeletonRef } paddingTop={ 2 }>
      { isLoading ? (
        <SkeletonTable
          cols={
            windowWidth && windowWidth > theme.breakpoints.values.sm ? 3 : 2
          }
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
        />
      ) }
    </Box>
  );
};

export default Portfolio;
