import { FunctionComponent, useState } from "react";
import { Box, Container } from "@mui/material";
import { SkeletonTable, Typography } from "elements";
import { SearchBox } from "components";
import OwnersTable from "./OwnersTable";
import mockOwnersData, { Owner } from "./mockOwnersData";
import NoOwnersYet from "./NoOwnersYet";

const Owners: FunctionComponent = () => {
  const { data = [], isLoading, isSuccess } = mockOwnersData; // temporary until API is ready
  const ownersData: Owner[] = data;
  const [page, setPage] = useState(1);

  const [filteredData, setFilteredData] = useState(ownersData);
  const [query, setQuery] = useState("");

  const handleSearch = (searched: string) => {
    setQuery(searched);
    setPage(1);
    if (searched == "") {
      setFilteredData(ownersData);
    } else {
      setFilteredData(
        ownersData.filter(
          (owner) =>
            owner.name.toLowerCase().includes(searched.toLowerCase()) ||
            owner.song.toLowerCase().includes(searched.toLowerCase())
        )
      );
    }
  };
  const renderContent = (
    isLoading: boolean,
    isSuccess: boolean,
    ownersData: Owner[]
  ) => {
    if (isLoading) {
      return (
        <>
          <SearchBox
            placeholder="Search by owner or song"
            query={ query }
            onSearch={ handleSearch }
          />
          <SkeletonTable />
        </>
      );
    } else if (isSuccess && ownersData.length == 0) {
      return (
        <Box sx={ { margin: "auto", position: "relative", bottom: "50px" } }>
          <NoOwnersYet />
        </Box>
      );
    } else if (isSuccess && ownersData.length > 0) {
      return (
        <>
          <SearchBox
            placeholder="Search by owner or song"
            query={ query }
            onSearch={ handleSearch }
          />

          <OwnersTable
            ownersData={ query == "" ? ownersData : filteredData }
            page={ page }
            setPage={ setPage }
          />
        </>
      );
    }
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginX: [null, null, 3],
        paddingRight: [null, null, 7.5],
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        flexWrap: "nowrap",
      } }
    >
      <Typography sx={ { pb: 4 } } variant="h3">
        OWNERS
      </Typography>
      { renderContent(isLoading, isSuccess, ownersData) }
    </Container>
  );
};

export default Owners;
