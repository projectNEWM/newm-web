import { FunctionComponent, ReactNode, SyntheticEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useFlags } from "launchdarkly-react-client-sdk";

import { Box, Stack, Tab, Tabs, Theme, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button, Tooltip } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { MintingStatus } from "@newm-web/types";

import TrackInfo from "./tabs/TrackInfo";
import MintTrack from "./tabs/MintTrack";
import { MarketplaceTab } from "./tabs/MarketplaceTab";
import ReleaseDeletionHelp from "../../ReleaseDeletionHelp";
import { setToastMessage } from "../../../../../modules/ui";
import {
  emptySong,
  useGetSongQuery,
  useHasSongAccess,
} from "../../../../../modules/song";

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

interface ColorMap {
  [index: number]: Partial<keyof Theme["gradients" | "colors"]>;
}

const TabPanel: FunctionComponent<TabPanelProps> = ({
  children,
  value,
  index,
}) => {
  return (
    <Stack
      alignItems={ ["center", "center", "unset"] }
      aria-labelledby={ `tab-${index}` }
      hidden={ value !== index }
      id={ `tabpanel-${index}` }
      mb={ 2 }
      role="tabpanel"
    >
      { value === index && children }
    </Stack>
  );
};

const colorMap: ColorMap = {
  0: "music",
  1: "crypto",
  2: "partners",
};

const ViewTrack: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tab, setTab] = useState(0);

  const { trackId } = useParams<"trackId">() as { trackId: string | undefined };

  const { data: { title, mintingStatus } = emptySong, error } = useGetSongQuery(
    trackId ?? ""
  );

  const { webStudioManageMarketplaceSales } = useFlags();

  const hasAccess = useHasSongAccess(trackId ?? "");
  const isSongMintedOrReleased = [
    MintingStatus.Minted,
    MintingStatus.Released,
  ].includes(mintingStatus);

  const shouldRenderMarketplaceTab =
    isSongMintedOrReleased && webStudioManageMarketplaceSales;

  const handleChange = (event: SyntheticEvent, nextTab: number) => {
    setTab(nextTab);
  };

  // TODO: show "Not found" content if not available for user
  if (error || !hasAccess) {
    navigate("/home/releases");

    dispatch(
      setToastMessage({
        message: "Error fetching song data",
        severity: "error",
      })
    );
  }

  return (
    <>
      <Stack alignItems="center" direction="row" gap={ 2.5 }>
        <Button
          color="white"
          variant="outlined"
          width="icon"
          onClick={ () => navigate(-1) }
        >
          <ArrowBackIcon sx={ { color: "white" } } />
        </Button>

        { title && <Typography variant="h3">{ title.toUpperCase() }</Typography> }

        <Tooltip title={ <ReleaseDeletionHelp /> }>
          <Stack ml="auto">
            <Button
              color="white"
              disabled={ true }
              sx={ { marginLeft: "auto" } }
              variant="outlined"
              width="icon"
            >
              <DeleteIcon fontSize="small" sx={ { color: "white" } } />
            </Button>
          </Stack>
        </Tooltip>
      </Stack>

      <Box pb={ 7 } pt={ 5 }>
        <Tabs
          aria-label="Edit song details"
          sx={ {
            ".Mui-selected": {
              background: theme.gradients[colorMap[tab]],
              backgroundClip: "text",
              color: theme.colors[colorMap[tab]],
              textFillColor: "transparent",
            },
            ".MuiButtonBase-root.MuiTab-root": {
              minWidth: "auto",
              ...theme.typography.subtitle2,
              fontWeight: 600,
            },
            ".MuiTabs-flexContainer": {
              gap: 4,
              justifyContent: ["center", "center", "normal"],
            },
            ".MuiTabs-indicator": {
              background: theme.gradients[colorMap[tab]],
            },
          } }
          value={ tab }
          onChange={ handleChange }
        >
          <Tab aria-controls="tabpanel-0" id="tab-0" label="INFO" />
          <Tab aria-controls="tabpanel-1" id="tab-1" label="MINTING" />
          { shouldRenderMarketplaceTab && (
            <Tab aria-controls="tabpanel-2" id="tab-2" label="MARKETPLACE" />
          ) }
        </Tabs>

        <TabPanel index={ 0 } value={ tab }>
          <TrackInfo />
        </TabPanel>
        <TabPanel index={ 1 } value={ tab }>
          <MintTrack />
        </TabPanel>
        <TabPanel index={ 2 } value={ tab }>
          <MarketplaceTab />
        </TabPanel>
      </Box>
    </>
  );
};

export default ViewTrack;
