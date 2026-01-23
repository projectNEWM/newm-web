import { FunctionComponent, ReactNode, SyntheticEvent, useState } from "react";
import { Box, Link, Stack, Tab, Tabs, Theme, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ProfileImage, Tooltip } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { resizeCloudinaryImage } from "@newm-web/utils";
import { MintingStatus } from "@newm-web/types";
import { useFlags } from "launchdarkly-react-client-sdk";
import MintSong from "./MintSong";
import SongInfo from "./SongInfo";
import { SongRouteParams } from "../../../common/types";
import { MarketplaceTab } from "./MarketplaceTab";
import { NEWM_SUPPORT_EMAIL, isSongEditable } from "../../../common";
import { setToastMessage } from "../../../modules/ui";
import {
  emptySong,
  useGetSongQuery,
  useHasSongAccess,
} from "../../../modules/song";

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

const ViewDetails: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tab, setTab] = useState(0);

  const { songId } = useParams<"songId">() as SongRouteParams;

  const {
    data: { title, coverArtUrl, mintingStatus } = emptySong,
    error,
    isLoading,
  } = useGetSongQuery(songId);

  const { webStudioManageMarketplaceSales } = useFlags();

  const hasAccess = useHasSongAccess(songId);
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
    navigate("/home/library");

    dispatch(
      setToastMessage({
        message: "Error fetching song data",
        severity: "error",
      })
    );
  }

  /**
   * Redirect if user manually navigates to this page before minting is complete
   */
  if (!isLoading && isSongEditable(mintingStatus)) {
    navigate(`/home/library/edit-song/${songId}`, { replace: true });
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
        <ProfileImage
          alt="Song cover art"
          height="90px"
          src={ resizeCloudinaryImage(coverArtUrl, { height: 180, width: 180 }) }
          width="90px"
        />
        { title && <Typography variant="h3">{ title.toUpperCase() }</Typography> }
        <Tooltip
          title={
            <span>
              To delete a song for which minting and distribution is in process
              or has completed, please send a deletion request email to{ " " }
              <Link href={ `mailto:${NEWM_SUPPORT_EMAIL}` }>
                { NEWM_SUPPORT_EMAIL }
              </Link>
              . Please note that artists not holding 100% of Stream Tokens for a
              given track are unable to cease minting and distribution.
            </span>
          }
        >
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
          <SongInfo />
        </TabPanel>
        <TabPanel index={ 1 } value={ tab }>
          <MintSong />
        </TabPanel>
        <TabPanel index={ 2 } value={ tab }>
          <MarketplaceTab />
        </TabPanel>
      </Box>
    </>
  );
};

export default ViewDetails;
