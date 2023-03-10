import { Stack, Typography } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { Button } from "elements";
import theme from "theme";

const IdenfyFailSession: FunctionComponent = () => {
  useEffect(() => {
    window.parent.postMessage("idenfy-verification-fail");
  }, []);

  const handleClick = () => {
    window.parent.postMessage("idenfy-modal-close");
  };

  return (
    <Stack
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        flexGrow: 1,
        justifyContent: "center",
      } }
    >
      <Typography variant="h1">OOPS!</Typography>
      <Typography
        sx={ {
          fontWeight: 400,
          my: [2, 3, 4],
          px: [2, 3],
        } }
      >
        Sorry, we couldn&apos;t verify your profile. Please check your email and
        review your details. Try again after 30 minutes.
      </Typography>
      <Button onClick={ handleClick }>Got it</Button>
    </Stack>
  );
};

export default IdenfyFailSession;
