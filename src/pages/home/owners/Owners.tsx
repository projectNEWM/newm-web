import { FunctionComponent, useState } from "react";
import { Box } from "@mui/material";
import { TextInput, Typography } from "elements";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import theme from "theme";
import OwnersTable from "./OwnersTable";

const Owners: FunctionComponent = () => {
  const [filter, setFilter] = useState("");

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
      <Typography sx={ { pb: 4 } } variant="h1">
        OWNERS
      </Typography>

      <Box sx={ { width: { xs: 200, sm: 380 }, pb: 3 } }>
        <TextInput
          value={ filter }
          onChange={ (e) => setFilter(e.target.value) }
          style={ {
            width: "380px",
            maxWidth: "380px",
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
      <OwnersTable filter={ filter } />
    </Box>
  );
};

export default Owners;
