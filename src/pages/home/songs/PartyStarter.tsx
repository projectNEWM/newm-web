/**
 * Empty state component for when there aren't any songs.
 */

import { FunctionComponent } from "react";
import { Box, Typography } from "@mui/material";
import { FilledButton } from "components";
import theme from "theme";

const PartyStarter: FunctionComponent = () => {
  return (
    <Box>
      <Typography
        sx= { {
          color: theme.palette.primary.main,
          fontWeight: 900,
          padding: "34px 0 40px 0",
          width: "100%",
        } }
        align="center"
        variant="h5"
      >
        Lets Get This Party Started
      </Typography>
      <hr style={ { border: 0, borderTop: "1px solid #CC33CC", width:"100%" } } />
      <Box>
        <Box pt="47px" pb="40px">
          <Typography
            align="center"
            variant="body1"
          >
            Upload your first big hit to your portal and share your talent with the world!
          </Typography>
        </Box>
        { /* IMAGE UPLOAD COMPONENT NOT WORKING */ }
        <Box
          sx={ {
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          } }
        >
          { /* DRAG AND DROP */ }
          <Typography
            variant="body1"
            align="center"
            color="primary"
            marginTop="30px"
            marginBottom="27px"
          >
            OR
          </Typography>
          <FilledButton
            sx={ { width: "164px" } }
          >
            Upload Image
          </FilledButton>
        </Box>
      </Box>
    </Box>
  );
}

export default PartyStarter;
