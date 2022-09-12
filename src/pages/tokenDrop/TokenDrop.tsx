import { Box } from "@mui/material";
import { Typography } from "elements";
import { FunctionComponent } from "react";
import theme from "theme";

const TokenDrop: FunctionComponent = () => {
  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black100,
        display: "flex",
        flexGrow: 1,
      } }
    >
      <Typography>Hello world</Typography>
    </Box>
  );
};

export default TokenDrop;
