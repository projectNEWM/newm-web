import { Box, Tab, Tabs, styled } from "@mui/material";
import React from "react";

import { Songs } from "./Songs.jsx";

const StyledTab = styled(Tab)(({ theme }) => ({
  backgroundColor: "transparent",
  border: "none",
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.tabs.fontFamily,
  fontWeight: theme.typography.tabs.fontWeight,
  textTransform: "capitalize"
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div { ...other }>{ value === index && <Box p={ 3 }>{ children }</Box> }</div>;
}

export const Content = props => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "songs",
    1: "playlists",
    2: "contributors",
    3: "wallet",
    4: "metrics"
  };

  const indexToTabName = {
    contributors: 2,
    metrics: 4,
    playlists: 1,
    songs: 0,
    wallet: 3
  };

  const [value, setValue] = React.useState(indexToTabName[page]);
  const handleChange = (event, newValue) => {
    history.push(`/home/${tabNameToIndex[newValue]}`);
    setValue(newValue);
  };

  return (
    <Box sx={ { justifyContent: "center", marginLeft: "auto", marginRight: "auto" } }>
      <Tabs
        centered
        value={ value }
        onChange={ handleChange }
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
        <TabPanel value={ value } index={ 0 }>
          <Box sx={ { width: "1060px", marginLeft: "auto", marginRight: "auto" } }>
            <Songs history={ history } />
          </Box>
        </TabPanel>
        <TabPanel value={ value } index={ 1 }>
          Playlists
        </TabPanel>
        <TabPanel value={ value } index={ 2 }>
          Contributors
        </TabPanel>
        <TabPanel value={ value } index={ 3 }>
          Wallet
        </TabPanel>
        <TabPanel value={ value } index={ 4 }>
          Metrics
        </TabPanel>
      </Box>
    </Box>
  );
};
