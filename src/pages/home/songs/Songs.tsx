import { Box } from "@mui/material";
import Popup from "components/Popup";
import { History } from "history";
import { useState } from "react";
import SongGrid from "./SongGrid";
import SongUploadForm from "./SongUploadForm";
export interface SongsProps {
  history: History;
}

const Songs = ({ history }: SongsProps) => {
  const [openPopup, setOpenPopup] = useState(false);



  return (
    <>
      <Popup
        height="522px"
        openPopup={ openPopup }
        setOpenPopup={ setOpenPopup }
      >
        <SongUploadForm setOpenPopup={ setOpenPopup } />
      </Popup>
      
      <Box pb={ 2 }>
        <SongGrid 
          history= { history } 
          setOpenPopup={ setOpenPopup }
        />
      </Box>
    </>
  );
};

export default Songs;
