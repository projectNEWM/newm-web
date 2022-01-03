import React from "react";

import { Box, Tabs, Tab } from "@mui/material";
import { ArtistProfile } from "./artist-profile";



export const Content = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}
    >
      <Tabs centered
        sx={{ justifyContent: "center" }}
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  );
};
