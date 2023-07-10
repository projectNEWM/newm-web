import { Stack, Tab, Tabs, Theme, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactNode, SyntheticEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import theme from "theme";
import { Button } from "elements";
import { ProfileImage } from "components";
import {
  emptySong,
  getIsSongDeletable,
  useDeleteSongThunk,
  useGetSongQuery,
  useHasSongAccess,
} from "modules/song";
import { setToastMessage } from "modules/ui";
import { useDispatch } from "react-redux";
import SongInfo from "./SongInfo";
import MintSong from "./MintSong";
import DeleteSongModal from "./DeleteSongModal";

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

interface RouteParams {
  readonly songId: string;
}

interface ColorMap {
  [index: number]: Partial<keyof Theme["gradients" | "colors"]>;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <Stack
      aria-labelledby={ `tab-${index}` }
      hidden={ value !== index }
      id={ `tabpanel-${index}` }
      role="tabpanel"
      mb={ 2 }
    >
      { value === index && children }
    </Stack>
  );
};

const EditSong = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { songId } = useParams<"songId">() as RouteParams;

  const hasAccess = useHasSongAccess(songId);
  const [deleteSong] = useDeleteSongThunk();

  const [tab, setTab] = useState(0);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const { data: { coverArtUrl, title, mintingStatus } = emptySong, error } =
    useGetSongQuery(songId);

  const colorMap: ColorMap = {
    0: "music",
    1: "crypto",
    2: "partners",
  };

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

        <>
          <Button
            color="white"
            variant="outlined"
            width="icon"
            disabled={ !getIsSongDeletable(mintingStatus) }
            sx={ { marginLeft: "auto" } }
            onClick={ () => {
              setIsDeleteModalActive(true);
            } }
          >
            <DeleteIcon fontSize="small" sx={ { color: "white" } } />
          </Button>

          { isDeleteModalActive && (
            <DeleteSongModal
              primaryAction={ () => {
                deleteSong({ songId });
              } }
              secondaryAction={ () => {
                setIsDeleteModalActive(false);
              } }
            />
          ) }
        </>
      </Stack>

      <Stack sx={ { borderBottom: 1, borderColor: theme.colors.grey300, mt: 4 } }>
        <Tabs
          value={ tab }
          onChange={ handleChange }
          aria-label="Edit song details"
          sx={ {
            ".MuiButtonBase-root.MuiTab-root": {
              minWidth: "auto",
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
          <Tab label="Info" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Minting" id="tab-1" aria-controls="tabpanel-1" />
          <Tab label="Marketplace" id="tab-2" aria-controls="tabpanel-2" />
        </Tabs>
      </Stack>

      <TabPanel value={ tab } index={ 0 }>
        <SongInfo />
      </TabPanel>
      <TabPanel value={ tab } index={ 1 }>
        <MintSong />
      </TabPanel>
      <TabPanel value={ tab } index={ 2 }>
        Marketplace content goes here
      </TabPanel>
    </>
  );
};

export default EditSong;
