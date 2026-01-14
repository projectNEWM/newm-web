import { FunctionComponent, useState } from "react";
import { Typography } from "@mui/material";
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
