import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

const LegacyAllCaughtUp: FunctionComponent = () => {
  return (
    <Box sx={ { display: "flex", justifyContent: "center", width: "100%" } }>
      <Typography fontSize={ 12 } fontWeight={ 400 }>
        You&apos;re all caught up{ " " }
        <span aria-label="tada" role="img">
          🎉
        </span>
      </Typography>
    </Box>
  );
};

export default LegacyAllCaughtUp;
