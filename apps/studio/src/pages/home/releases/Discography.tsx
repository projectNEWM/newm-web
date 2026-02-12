import { FunctionComponent, useState } from "react";

import { Box, Typography } from "@mui/material";

import { useFlags } from "launchdarkly-react-client-sdk";

import {
  GradientDashedOutline,
  IconMessage,
  Link,
  Tooltip,
} from "@newm-web/elements";
import { AddSong } from "@newm-web/assets";

import SongList from "./SongList";
import OfficialStatementCTA from "../../../components/OfficialStatementCTA";
import { SearchBox } from "../../../components";
import { useGetSongCountQuery } from "../../../modules/song";

const Discography: FunctionComponent = () => {
  // TODO(webStudioAlbumPhaseTwo): Remove flag once flag is retired.
  const { webStudioAlbumPhaseTwo, webStudioDisableDistributionAndSales } =
    useFlags();

  const [query, setQuery] = useState("");

  const { data: { count: totalCountOfSongs = 0 } = {} } = useGetSongCountQuery({
    ownerIds: ["me"],
    phrase: query,
  });

  const handleSearch = (searched: string) => {
    setQuery(searched);
  };

  return (
    <>
      <Typography sx={ { pb: 4 } } variant="h3">
        RELEASES
      </Typography>

      <Box sx={ { mb: 5.5 } }>
        { webStudioDisableDistributionAndSales ? (
          <Tooltip title={ <OfficialStatementCTA /> }>
            <Box
              aria-label="Create New Release"
              component="span"
              sx={ {
                cursor: "not-allowed",
                textDecoration: "none",
              } }
            >
              <GradientDashedOutline sx={ { padding: 3 } }>
                <IconMessage icon={ <AddSong /> } message="Create New Release" />
              </GradientDashedOutline>
            </Box>
          </Tooltip>
        ) : (
          <Link
            aria-label="Create New Release"
            sx={ { textDecoration: "none" } }
            to={
              webStudioAlbumPhaseTwo
                ? "/home/releases/new"
                : "/home/upload-song"
            }
          >
            <GradientDashedOutline sx={ { padding: 3 } }>
              <IconMessage icon={ <AddSong /> } message="Create New Release" />
            </GradientDashedOutline>
          </Link>
        ) }
      </Box>

      { totalCountOfSongs || query ? (
        <SearchBox
          placeholder="Search by release title"
          query={ query }
          onSearch={ handleSearch }
        />
      ) : null }

      <SongList query={ query } totalCountOfSongs={ totalCountOfSongs } />
    </>
  );
};

export default Discography;
