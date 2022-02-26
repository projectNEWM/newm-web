import { Box, Container, Tabs } from "@mui/material";
import { Page, useWindowDimensions } from "common";
import { Tab } from "components";
import { History } from "history";
import React, { FunctionComponent, HTMLAttributes } from "react";
import Playlists from "./playlists";
import Songs from "./songs";
import TabPanel from "./TabPanel";
import WalletOverview from "./wallet";

interface HomePropTypes extends HTMLAttributes<HTMLDivElement> {
  page?: string;
  history: History;
}

const Home: FunctionComponent<HomePropTypes> = (props) => {
  const windowDimensions = useWindowDimensions();
  const height = windowDimensions && windowDimensions.height;

  const { page: pageName, history } = props;

  const initialPage = (pageName && Page[pageName as keyof typeof Page]) || Page.songs;

  const [value, setValue] = React.useState(initialPage);

  const handleChange = (_event: React.SyntheticEvent, newValue: Page) => {
    history?.push(`/home/${Page[newValue]}`);
    setValue(newValue);
  };

  return (
    <Box
      sx={ {
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
      } }
    >
      <Box py={ 2 }>
        <Tabs
          centered
          value={ value }
          onChange={ handleChange }
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="Songs" />
          <Tab label="Playlists" />
          <Tab label="Contributors" />
          <Tab label="Wallet" />
          <Tab label="Metrics" />
        </Tabs>
      </Box>

      <Box
        data-testid="contentBox"
        justifyContent="center"
        maxHeight={ height && height - 290 }
        overflow={ "scroll" }
        id="content"
      >
        <TabPanel value={ value } page={ Page.songs }>
          <Container maxWidth="lg">
            <Songs history={ history } />
          </Container>
        </TabPanel>
        <TabPanel value={ value } page={ Page.playlists }>
          <Container maxWidth="lg">
            <Playlists />
          </Container>
        </TabPanel>
        <TabPanel value={ value } page= { Page.contributors }>
        <Container maxWidth="lg">
           Contributors
          </Container>
            
        </TabPanel>
        <TabPanel value={value} page={Page.wallet}>
        <Container maxWidth="lg">
            <WalletOverview />
        </Container>
        </TabPanel>
        <TabPanel value={ value } page={ Page.metrics }>
          Metrics
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Home;
