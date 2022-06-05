import { FunctionComponent, useState } from "react";
import { Box } from "@mui/material";
import { TextInput, Typography } from "elements";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import theme from "theme";
import OwnersTable from "./OwnersTable";
import mockOwnersData from "./mockOwnersData";
import NoOwnersYet from "./NoOwnersYet";

const Owners: FunctionComponent = () => {
  const ownersData = mockOwnersData; // temporary until API is ready

  const [filteredData, setFilteredData] = useState(ownersData);
  const [query, setQuery] = useState("");

  const requestSearch = (searched: string) => {
    setQuery(searched);
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

  return (
    <Box
      padding="60px"
      display="flex"
      flexDirection="column"
      flexGrow={ 1 }
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Typography sx={ { pb: 4 } } variant="h3">
        OWNERS
      </Typography>

      { ownersData.length ? (
        <>
          <Box sx={ { pb: 3, width: "340px" } }>
            <TextInput
              value={ query }
              onChange={ (e) => requestSearch(e.target.value) }
              style={ {
                width: "100%",
              } }
              startAdornment={
                <SearchRoundedIcon
                  fontSize="large"
                  sx={ {
                    color: theme.palette.text.secondary,
                    paddingLeft: "8px",
                  } }
                />
              }
              placeholder="Search by owner or song"
            ></TextInput>
          </Box>
          <OwnersTable ownersData={ filteredData } />
        </>
      ) : (
        <Box sx={ { margin: "auto", position: "relative", bottom: "50px" } }>
          <NoOwnersYet />
        </Box>
      ) }
    </Box>
  );
};

export default Owners;
