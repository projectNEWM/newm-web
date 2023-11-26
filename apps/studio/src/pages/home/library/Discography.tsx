import { FunctionComponent, useState } from 'react';
import { SearchBox } from '@newm.io/studio/components';
import { useGetSongCountQuery } from '@newm.io/studio/modules/song';
import { Typography } from '@newm.io/studio/elements';
import SongList from './SongList';

const Discography: FunctionComponent = () => {
  const [query, setQuery] = useState('');

  const { data: { count: totalCountOfSongs = 0 } = {} } = useGetSongCountQuery({
    ownerIds: ['me'],
    phrase: query,
  });

  const handleSearch = (searched: string) => {
    setQuery(searched);
  };

  return (
    <>
      <Typography sx={{ pb: 4 }} variant="h3">
        LIBRARY
      </Typography>

      {totalCountOfSongs || query ? (
        <SearchBox
          placeholder="Search songs"
          query={query}
          onSearch={handleSearch}
        />
      ) : null}

      <SongList totalCountOfSongs={totalCountOfSongs} query={query} />
    </>
  );
};

export default Discography;
