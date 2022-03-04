import { Box, Container, Tabs } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Page, useWindowDimensions } from "common";
import { Tab } from "components";
import { History } from "history";
import { setHomeViewType } from "modules/ui";
import React, { FunctionComponent, HTMLAttributes, useEffect } from "react";
import { useDispatch } from "react-redux";
import Playlists from "./playlists";
import Songs from "./songs";
import TabButtons from "./TabButtons";
import TabPanel from "./TabPanel";
import WalletOverview from "./wallet";


interface HomePropTypes extends HTMLAttributes<HTMLDivElement> {
  page?: string;
  history: History;
}

const Home: FunctionComponent<HomePropTypes> = (props) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const windowDimensions = useWindowDimensions();
  const height = windowDimensions && windowDimensions.height;

  const { page: pageName, history } = props;

  const initialPage = (pageName && Page[pageName as keyof typeof Page]) || Page.songs;

  const [value, setValue] = React.useState(initialPage);

  const handleChange = (_event: React.SyntheticEvent, newValue: Page) => {
    history?.push(`/home/${Page[newValue]}`);
    setValue(newValue);
  };

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
        <Box
          py={ 2 }
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box />

          <Box>
            <Tabs
              value={ value }
              onChange={ handleChange }
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              <Tab label="Songs" />
              <Tab label="Playlists" />
              <Tab label="Contributors" />
              <Tab label="Wallet" />
              <Tab label="Metrics" />
            </Tabs>
          </Box>

          <Box>
            <TabButtons />
          </Box>
        </Box>

        <Box
          data-testid="contentBox"
          justifyContent="center"
          maxHeight={ height && height - 290 }
          overflow={ "scroll" }
          id="content"
        >
          <TabPanel value={ value } page={ Page.songs }>
            <Songs history={ history } />
          </TabPanel>
          <TabPanel value={ value } page={ Page.playlists }>
            <Playlists />
<<<<<<< Updated upstream
          </Container>
        </TabPanel>
        <TabPanel value={ value } page= { Page.contributors }>
        <Container maxWidth="lg">
           Contributors
          </Container>
            
        </TabPanel>
        <TabPanel value={ value } page={ Page.wallet }>
        <Container maxWidth="lg">
            <WalletOverview />
        </Container>
        </TabPanel>
        <TabPanel value={ value } page={ Page.metrics }>
          Metrics
        </TabPanel>
=======
          </TabPanel>
          <TabPanel value={ value } page={ Page.contributors }>
            Contributors
          </TabPanel>
          <TabPanel value={ value } page={ Page.wallet }>
            Wallet
          </TabPanel>
          <TabPanel value={ value } page={ Page.metrics }>
            Metrics
          </TabPanel>
        </Box>
>>>>>>> Stashed changes
      </Box>
    </Container>
  );
};

export default Home;
