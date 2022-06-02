import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { TextInput, Typography } from "elements";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import theme from "theme";
import OwnersTable from "./OwnersTable";

const Owners: FunctionComponent = () => {
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
      <Typography sx={ {} } variant="h1">
        OWNERS
      </Typography>

      <Box sx={ { width: { xs: 200, sm: 380 } } }>
        <TextInput
          style={ {
            width: "380px",
            maxWidth: "380px",
            // minWidth: "100px",
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
      <OwnersTable />
    </Box>
  );
};

export default Owners;
