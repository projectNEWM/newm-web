import { FunctionComponent, useEffect, useState } from "react";
import { MintingStatus, Song } from "@newm-web/types";
import { Stack, Typography } from "@mui/material";
import SinglePortfolioItem from "./SinglePortfolioItem";
import { calculateStartDate, royaltyPeriodFilters } from "./utils";
import { PortfolioTableFilter } from "../../../../common";
import { PortfolioSkeleton, TableDropdownSelect } from "../../../../components";
import {
  GetSongsRequest,
  useGetSongCountQuery,
  useLazyGetSongsQuery,
} from "../../../../modules/song";
import { EmptyPortfolio } from "../EmptyPortfolio";
import AllCaughtUp from "../AllCaughtUp";

interface FetchOptions {
  limit: GetSongsRequest["limit"];
  mintingStatuses: GetSongsRequest["mintingStatuses"];
  offset: number;
  ownerIds: GetSongsRequest["ownerIds"];
  startDate: GetSongsRequest["startDate"];
}

const Portfolio: FunctionComponent = () => {
  const PAGE_LIMIT = 25;
  const [isInitialLoadingState, setIsInitialLoadingState] = useState(true);
  const [songsDataCollection, setSongsDataCollection] = useState<Song[]>([]);
  const [filter, setFilter] = useState<PortfolioTableFilter>(
    PortfolioTableFilter.All
  );
  const [fetchOptions, setFetchOptions] = useState<FetchOptions>({
    limit: PAGE_LIMIT,
    mintingStatuses: [MintingStatus.Minted, MintingStatus.Released],
    offset: 0,
    ownerIds: ["me"],
    startDate: calculateStartDate(filter),
  });

  const [
    getSongs,
    { data: songsData = [], isLoading: isSongsLoading, isFetching, isSuccess },
  ] = useLazyGetSongsQuery();

  const { data: { count: totalCountOfSongs = 0 } = {} } = useGetSongCountQuery({
    mintingStatuses: [MintingStatus.Minted, MintingStatus.Released],
    ownerIds: ["me"],
  });

  const totalGetSongPages = Math.ceil(totalCountOfSongs / PAGE_LIMIT);
  const isPortfolioEmpty =
    isSuccess && !songsData.length && !songsDataCollection.length;

  // Check if all transactions have been loaded
  const isAllCaughtUp =
    !isFetching &&
    !isSongsLoading &&
    fetchOptions.offset / PAGE_LIMIT >= totalGetSongPages - 1;

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const isScrolledToBottom = scrollTop + 10 >= scrollHeight - clientHeight;

    const shouldFetchMoreSongs =
      isScrolledToBottom &&
      !isSongsLoading &&
      fetchOptions.offset / PAGE_LIMIT < totalGetSongPages - 1;

    if (shouldFetchMoreSongs) {
      setFetchOptions({
        ...fetchOptions,
        offset: fetchOptions.offset + PAGE_LIMIT,
      });
    }
  };

  const handleOnDropDownChange = (filter: PortfolioTableFilter) => {
    setFetchOptions({
      ...fetchOptions,
      offset: 0,
      startDate: calculateStartDate(filter),
    });
    setFilter(filter);
    setSongsDataCollection([]);
    setIsInitialLoadingState(true);
  };

  useEffect(() => {
    if (songsData.length) {
      setSongsDataCollection((prev) => [...prev, ...songsData]);
    }
    if (isInitialLoadingState) {
      setIsInitialLoadingState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songsData]);

  // Fetch songs based on fetchOptions
  useEffect(() => {
    getSongs(fetchOptions);
  }, [fetchOptions, getSongs]);

  if (isInitialLoadingState) {
    return (
      <Stack mt={ 5 }>
        <PortfolioSkeleton count={ 15 } />
      </Stack>
    );
  }

  if (isPortfolioEmpty) {
    return <EmptyPortfolio />;
  }

  return (
    <Stack>
      <Stack
        alignItems="center"
        direction="row"
        gap={ 1 }
        justifyContent="space-between"
        mt={ 3 }
      >
        { songsDataCollection.length > 0 && (
          <>
            <Typography>SONG</Typography>
            <TableDropdownSelect
              menuItems={ royaltyPeriodFilters }
              selectedValue={ filter }
              onDropdownChange={ handleOnDropDownChange }
            />
          </>
        ) }
      </Stack>
      <Stack
        sx={ { maxHeight: "60vh", mt: 2, overflow: "auto", pr: 1.5 } }
        onScroll={ handleScroll }
      >
        { songsDataCollection.map(
          ({ title, id, earnings, coverArtUrl }, index) => (
            <SinglePortfolioItem
              coverArtUrl={ coverArtUrl }
              earnings={ earnings }
              id={ id }
              index={ index }
              key={ id }
              title={ title }
            />
          )
        ) }
        <Stack mt={ 2 }>
          { isFetching && !isSongsLoading && <PortfolioSkeleton /> }
          { isAllCaughtUp && <AllCaughtUp /> }
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Portfolio;
