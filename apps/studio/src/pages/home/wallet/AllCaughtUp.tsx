import { Box } from "@mui/material";
import { Typography } from "@newm-web/elements";
import { FunctionComponent } from "react";

const AllCaughtUp: FunctionComponent = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Typography fontWeight={400} fontSize={12}>
        You&apos;re all caught up{" "}
        <span role="img" aria-label="tada">
          🎉
        </span>
      </Typography>
    </Box>
  );
};

export default AllCaughtUp;
