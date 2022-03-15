import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { setHomeViewType, TabName } from "modules/ui";
import { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import MetricsOverview from "./metrics";
import Playlists from "./playlists";
import Songs from "./songs";
import TabPanel from "./TabPanel";
import WalletOverview from "./wallet";

const Home: FunctionComponent = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { pathname }= useLocation();
  const tabName: TabName = pathname.split("/")[2] as TabName;

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * Set home page view type based on screen size when component mounts.
   */
  useEffect(() => {
    if (isSmallScreen) {
      dispatch(setHomeViewType("list"));
    } else {
      dispatch(setHomeViewType("grid"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg">
      <Box px={ { md: 3, sm: 0 } }>
        <Box justifyContent="center">
          <TabPanel value={ tabName } tab={ TabName.songs }>
            <Songs />
          </TabPanel>
          <TabPanel value={ tabName } tab={ TabName.playlists }>
            <Playlists />
          </TabPanel>
          <TabPanel value={ tabName } tab={ TabName.contributors }>
            Contributors
          </TabPanel>
          <TabPanel value={ tabName } tab={ TabName.wallet }>
            <WalletOverview />
          </TabPanel>
          <TabPanel value={ tabName } tab={ TabName.metrics }>
            <MetricsOverview />
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
