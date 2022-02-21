import { useState } from "react";
import { CardMedia } from "@mui/material";
import { History } from "history";
import SongCard from "./SongCard"
import SongHover from "./SongHover";

interface SongProps {
  songId: number;
  name: string;
  albumImage: string;
  history: History;
}

const Song = ({ songId, name, albumImage, history }: SongProps) => {
  const [hovering, setHover] = useState(false);

  return (
    <>
      <SongCard onClick={ () => history.push(`/home/song/${songId}`) }>
        <CardMedia
          image={ albumImage }
          onMouseEnter={ () => setHover(true) }
          onMouseLeave={ () => setHover(false) }
          style={ {
            borderRadius: "100px",
            height: "200px",
            margin: "auto",
            marginTop: "25px",
            opacity: "1",
            width: "200px",
          } }
        >
          <SongHover hovering={ hovering } name={ name } />
        </CardMedia>
      </SongCard>
    </>
  );
};

export default Song;
