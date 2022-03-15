import { Tab } from "components";
import { Box, Tabs } from "@mui/material";
import { TabName } from "modules/ui";
import { FunctionComponent, SyntheticEvent } from "react";
import { useHistory, useLocation } from "react-router-dom";
import TabButtons from "./TabButtons";

const HeaderTabs: FunctionComponent = () => {
  const history = useHistory();

  const { pathname } = useLocation();

  const tabName: TabName = pathname.split("/")[2] as TabName;

  const handleChange = (_event: SyntheticEvent, newValue: TabName) => {
    history.push(`/home/${newValue}`);
  };

  return (
    <Box
      px={ 2 }
      py={ 2 }
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box />

      <Box>
        <Tabs
          value={ TabName[tabName] || TabName.songs }
          onChange={ handleChange }
          textColor="primary"
          indicatorColor="primary"
          aria-label="home-tabs"
        >
          <Tab label="Songs" value={ TabName.songs } />
          <Tab label="Playlists" value={ TabName.playlists } />
          <Tab label="Contributors" value={ TabName.contributors} />
          <Tab label="Wallet" value={ TabName.wallet } />
          <Tab label="Metrics" value={ TabName.metrics } />
        </Tabs>
      </Box>

      <Box>
        <TabButtons />
      </Box>
    </Box>
  );
};

export default HeaderTabs;
