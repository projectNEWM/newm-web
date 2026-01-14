import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

import { GradientDashedOutline, IconMessage } from "@newm-web/elements";
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

      <Link aria-label="Create New Release" to="/home/upload-song">
        <GradientDashedOutline
          sx={ {
            marginBottom: 5.5,
            padding: 3,
          } }
        >
          <IconMessage icon={ <AddSong /> } message="Create New Release" />
        </GradientDashedOutline>
      </Link>

      { totalCountOfSongs || query ? (
        <SearchBox
          placeholder="Search songs"
          query={ query }
          onSearch={ handleSearch }
        />
      ) : null }

      <SongList query={ query } totalCountOfSongs={ totalCountOfSongs } />
    </>
  );
};

export default Discography;
