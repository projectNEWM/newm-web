import { Box, Typography } from "@mui/material";
import { FilledButton } from "components";

const MetricsOverview = () => {
  return (
    <div>
      <Typography align="center" variant="body1" pt="35px" pb="45px">
        We are currently working on the NEWM App.
        <br />
        As soon as our App is live, you will see all your metrics here. Stay tuned!
      </Typography>
      <Box sx={ { textAlign: "center" } }>
        <FilledButton sx={ { height: "38px", width: "164px" } }>Upload Music!</FilledButton>
      </Box>

      <div />
    </div>
  );
};

export default MetricsOverview;
