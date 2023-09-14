import { FunctionComponent, ReactNode, SyntheticEvent, useState } from "react";
import { Box, Stack, Tab, Tabs, Theme, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileImage } from "components";
import { Button } from "elements";
import {
  MintingStatus,
  emptySong,
  useGetSongQuery,
  useHasSongAccess,
} from "modules/song";
import { setToastMessage } from "modules/ui";
import theme from "theme";
import MintSong from "./MintSong";
import SongInfo from "./SongInfo";
import { SongRouteParams } from "./types";

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
      aria-labelledby={ `tab-${index}` }
      hidden={ value !== index }
      id={ `tabpanel-${index}` }
      role="tabpanel"
      mb={ 2 }
      alignItems={ ["center", "center", "unset"] }
    >
      { value === index && children }
    </Stack>
  );
};

const colorMap: ColorMap = {
  0: "music",
  1: "crypto",
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

  const hasAccess = useHasSongAccess(songId);

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
  if (!isLoading && mintingStatus === MintingStatus.Undistributed) {
    navigate(`/home/library/edit-song/${songId}`, { replace: true });
  }

  return (
    <>
      <Stack direction="row" alignItems="center" gap={ 2.5 }>
        <Button
          color="white"
          onClick={ () => navigate(-1) }
          variant="outlined"
          width="icon"
        >
          <ArrowBackIcon sx={ { color: "white" } } />
        </Button>
        <ProfileImage
          alt="Song cover art"
          height="90px"
          src={ coverArtUrl }
          width="90px"
        />
        { title && <Typography variant="h3">{ title.toUpperCase() }</Typography> }
      </Stack>

      <Box pt={ 5 } pb={ 7 }>
        <Tabs
          value={ tab }
          onChange={ handleChange }
          aria-label="Edit song details"
          sx={ {
            ".MuiButtonBase-root.MuiTab-root": {
              minWidth: "auto",
              ...theme.typography.subtitle2,
              fontWeight: 600,
            },
            ".MuiTabs-flexContainer": {
              gap: 4,
              justifyContent: ["center", "center", "normal"],
            },
            ".Mui-selected": {
              background: theme.gradients[colorMap[tab]],
              backgroundClip: "text",
              color: theme.colors[colorMap[tab]],
              textFillColor: "transparent",
            },
            ".MuiTabs-indicator": {
              background: theme.gradients[colorMap[tab]],
            },
          } }
        >
          <Tab label="INFO" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="MINTING" id="tab-1" aria-controls="tabpanel-1" />
        </Tabs>

        <TabPanel value={ tab } index={ 0 }>
          <SongInfo />
        </TabPanel>
        <TabPanel value={ tab } index={ 1 }>
          <MintSong />
        </TabPanel>
      </Box>
    </>
  );
};

export default ViewDetails;
