import { FunctionComponent, useState } from "react";
import { SongRoyalties, mockSongRoyalties } from "common";
import { Box, CircularProgress  } from "@mui/material";
import AllCaughtUp from "./AllCaughtUp";
import SongRoyaltiesList from "./SongRoyaltiesList";

const Portfolio: FunctionComponent = () => {
  const { data = [], isLoading, isSuccess } = mockSongRoyalties;
  const songRoyalties: SongRoyalties[] = data;

  const [page, setPage] = useState(1);

  const renderContent = (
    isLoading: boolean,
    isSuccess: boolean,
    songRoyalties: SongRoyalties[]
  ) => {
    if (isLoading) {
      return (
        <>
          <Box
            sx={ {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            } }
          >
            <CircularProgress color="secondary" />
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
    <Box paddingTop={ 2 }>{ renderContent(isLoading, isSuccess, songRoyalties) }</Box>
  );
};

export default Portfolio;
