import React from "react";

import { Box, styled, Tabs, Tab } from "@mui/material";
import { Songs } from "./songs.jsx";
import { borderColor, margin } from "@mui/system";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.tabs.fontFamily,
  fontWeight: theme.typography.tabs.fontWeight,
  border: "none",
  backgroundColor: "transparent",
  textTransform: "capitalize",
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

export const Content = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "songs",
    1: "playlists",
    2: "contributors",
    3: "wallet",
    4: "metrics",
  };

  const indexToTabName = {
    songs: 0,
    playlists: 1,
    contributors: 2,
    wallet: 3,
    metrics: 4,

  };

  const [value, setValue] = React.useState(indexToTabName[page]);
  const handleChange = (event, newValue) => {
    history.push(`/home/${tabNameToIndex[newValue]}`);
    setValue(newValue);

  };

  return (
    <Box
      sx={{ justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}
    >
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <StyledTab label="Songs" />
        <StyledTab label="Playlists" />
        <StyledTab label="Contributors" />
        <StyledTab label="Wallet" />
        <StyledTab label="Metrics" />
      </Tabs>

      <Box justifyContent="center">
        <TabPanel value={value} index={0}>
          <Box sx={{width:"1060px", marginLeft:"auto", marginRight:"auto" }}>
            <Songs history={history} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Playlists
        </TabPanel>
        <TabPanel value={value} index={2}>
          Contributors
        </TabPanel>
        <TabPanel value={value} index={3}>
          Wallet
        </TabPanel>
        <TabPanel value={value} index={4}>
          Metrics
        </TabPanel>
      </Box>
    </Box>
  );
};
