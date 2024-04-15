"use client";
import { FunctionComponent } from "react";
import { Typography } from "@mui/material";

// TODO: Page will not be needed as there is no way to determine mobile connectivity
const Page: FunctionComponent = () => {
  return (
    <>
      <Typography component="h1" fontWeight="700" mt={ 4 } variant="body2">
        Wallet connected on the Newm app!
      </Typography>
      <Typography mt={ 0.5 } variant="subtitle1">
        You can close this window.
        <br />
        Go dance like nobody is watching!
      </Typography>
    </>
  );
};

export default Page;
