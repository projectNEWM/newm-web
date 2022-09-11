/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { SongRoyalties, mockSongRoyalties, useWindowDimensions } from "common";
import { Box, CircularProgress } from "@mui/material";
import SkeletonTable from "elements/skeletons/TableSkeleton";
import theme from "theme";
import AllCaughtUp from "./AllCaughtUp";
import SongRoyaltiesList from "./SongRoyaltiesList";

const Portfolio: FunctionComponent = () => {
  const { data = [], isLoading, isSuccess } = mockSongRoyalties;
  const songRoyalties: SongRoyalties[] = data;
  const windowHeight = useWindowDimensions()?.height;
  const windowWidth = useWindowDimensions()?.width;
  const maxListWidth = 700;
  const skeletonRef = useRef<any>();
  const skeletonYPos = skeletonRef && skeletonRef.current?.offsetTop;
  const [skeletonRows, setSkeletonRows] = useState<number>(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSkeletonRows(
      windowHeight ? Math.floor((windowHeight - skeletonYPos - 200) / 50) : 10
    );
  }, [windowHeight, skeletonYPos]);

  const renderContent = (
    isLoading: boolean,
    isSuccess: boolean,
    songRoyalties: SongRoyalties[]
  ) => {
    if (isLoading) {
      return (
        <>
          <Box ref={ skeletonRef }>
            <SkeletonTable
              cols={
                windowWidth && windowWidth > theme.breakpoints.values.sm ? 3 : 2
              }
              rows={ skeletonRows }
              maxWidth={ maxListWidth }
            />
          </Box>
        </>
      );
    } else if (isSuccess && songRoyalties.length == 0) {
      return (
        <Box>
          <AllCaughtUp />
        </Box>
      );
    } else if (isSuccess && songRoyalties.length > 0) {
      return (
        <>
          <SongRoyaltiesList
            songRoyalties={ songRoyalties }
            page={ page }
            setPage={ setPage }
          />
        </>
      );
    }
  };
  return (
    <Box paddingTop={ 2 }>
      { renderContent(isLoading, isSuccess, songRoyalties) }
    </Box>
  );
};

export default Portfolio;
