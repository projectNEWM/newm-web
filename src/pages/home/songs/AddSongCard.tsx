import addSong from "assets/images/add-song.svg";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, useTheme } from "@mui/material";
import { History } from "history";
import SongCard from "./SongCard";

interface AddSongCardProps {
  id: string;
  albumImage: string;
  handleClick: () => void;
  history: History;
}

const AddSongCard = ({ id, handleClick, history }: AddSongCardProps) => {
  const theme = useTheme();
  const [hovering, setHover] = useState(false);

  return (
    <>
      <SongCard onClick={ () => history.push(`/home/song/${id}`) }>
        <Box
          onMouseEnter={ () => setHover(true) }
          onMouseLeave={ () => setHover(false) }
          sx={ {
            alignItems: "center",
            display: "flex",
            height: "inherit",
            justifyContent: "center",
          } }
        >
          <IconButton onClick={ handleClick } sx={ { color: theme.palette.primary.main } }>
            { hovering
              ? <AddIcon sx={ { fontSize: "40px" } } />
              : <img alt="add song" src={ addSong } /> }
          </IconButton>
        </Box>
      </SongCard>
    </>
  );
};

export default AddSongCard;
