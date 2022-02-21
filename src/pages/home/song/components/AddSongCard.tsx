import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Card, IconButton, useTheme } from "@mui/material";
import { History } from "history";
import addSong from "assets/svg/add-song.svg"

interface AddSongCardProps {
  id: string;
  albumImage: string;
  handleClick: () => void;
  history: History;
}

const AddSongIcon = () => <img alt="add song" src={ addSong } />

const AddSongCard = ({ id, handleClick, history }: AddSongCardProps) => {
  const theme = useTheme();
  const [hovering, setHover] = useState(false);

  return (
    <>
      <Card
        sx={ {
          background: "#0A0A0A 0% 0% no-repeat padding-box;",
          color: "black",
          height: "250px",
          margin: "0px",
          opacity: ".7",
          padding: "0px",
          textAlign: "center",
          width: "250px",
        } }
        onClick={ () => history.push(`/home/song/${id}`) }
      >
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
            { hovering ? <AddIcon sx={ { fontSize: "40px" } } /> : <AddSongIcon /> }
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default AddSongCard;
