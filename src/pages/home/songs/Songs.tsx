import { Box } from "@mui/material";
import { useAppSelector } from "common";
import Popup from "components/Popup";
import { selectSongs } from "modules/song";
import { selectHomeViewType } from "modules/ui";
import { useState } from "react";
import PartyStarter from "./PartyStarter";
import SongGrid from "./SongGrid";
import SongList from "./SongList";
import SongUploadForm from "./SongUploadForm";

const Songs = () => {
  const songs = useAppSelector(selectSongs);
  const viewType = useAppSelector(selectHomeViewType);

  const [openPopup, setOpenPopup] = useState(false);


  if (Object.values(songs).length === 0) {
    return <PartyStarter />;
  }

  return (
    <>
      <Popup height="522px" openPopup={ openPopup } setOpenPopup={ setOpenPopup }>
        <SongUploadForm setOpenPopup={ setOpenPopup } />
      </Popup>

      <Box pb={ 2 }>
        {
          viewType === "list"
            ? <SongList />
            : <SongGrid setOpenPopup={ setOpenPopup } />
        }
      </Box>
    </>
  );
};

export default Songs;
