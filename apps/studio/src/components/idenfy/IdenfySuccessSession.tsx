import { FunctionComponent, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { Button, GradientTypography } from "@newm-web/elements";
import theme from "@newm-web/theme";

const IdenfySuccessSession: FunctionComponent = () => {
  useEffect(() => {
    window.parent.postMessage("idenfy-verification-success");
  }, []);

  const handleClick = () => {
    window.parent.postMessage("idenfy-modal-close");
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        backgroundColor: theme.colors.black,
        flexGrow: 1,
        justifyContent: "center"
      }}
    >
      <Typography variant="h1">THANK YOU!</Typography>
      <GradientTypography
        style={{ ...theme.typography.emphasized }}
        variant="h1"
      >
        You will be notified soon.
      </GradientTypography>
      <Typography
        sx={{
          fontWeight: 400,
          my: [2, 3, 4]
        }}
      >
        Get ready to mint your songs and claim royalties.
      </Typography>
      <Button onClick={handleClick}>Got it</Button>
    </Stack>
  );
};

export default IdenfySuccessSession;
