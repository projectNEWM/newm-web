import { FunctionComponent, useState } from "react";

import { Box, Typography } from "@mui/material";

import { GradientDashedOutline, IconMessage, Link } from "@newm-web/elements";
import { AddSong } from "@newm-web/assets";

import SongList from "./SongList";
import { SearchBox } from "../../../components";
import { useGetSongCountQuery } from "../../../modules/song";

const Discography: FunctionComponent = () => {
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
        <Link
          aria-label="Create New Release"
          sx={ {
            textDecoration: "none",
          } }
          to="/home/upload-song"
        >
          <GradientDashedOutline
            sx={ {
              padding: 3,
            } }
          >
            <IconMessage icon={ <AddSong /> } message="Create New Release" />
          </GradientDashedOutline>
        </Link>
      </Box>

      { totalCountOfSongs || query ? (
        <SearchBox
          placeholder="Search by release name"
          query={ query }
          onSearch={ handleSearch }
        />
      ) : null }

      <SongList query={ query } totalCountOfSongs={ totalCountOfSongs } />
    </>
  );
};

export default Discography;
