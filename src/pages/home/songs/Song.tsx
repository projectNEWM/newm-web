import { Box, CardMedia } from "@mui/material";
import { History } from "history";
import { useState } from "react";
import { Transition } from "react-transition-group";
import SongHover from "./SongHover";
import SongCard from "./styled/SongCard";

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
            width: "200px"
          } }
        >
          <Box sx={ { height: "inherit" } }>
            <Transition in={ hovering } timeout={ duration }>
              { (
                state: keyof {
                  entering: { opacity: number };
                  entered: { opacity: number };
                  exiting: { opacity: number };
                  exited: { opacity: number };
                }
              ) => (
                <div
                  style={ {
                    ...styles.default,
                    ...styles.transition[state],
                    height: "inherit"
                  } }
                >
                  <SongHover hovering={ hovering } name={ name } />
                </div>
              ) }
            </Transition>
          </Box>
        </CardMedia>
      </SongCard>
    </>
  );
};

const duration = 250;

const styles = {
  default: {
    opacity: 0,
    transition: `opacity ${duration}ms ease-in-out`
  },
  transition: {
    entered: { opacity: 1 },
    entering: { opacity: 1 },
    exited: { opacity: 0 },
    exiting: { opacity: 0 }
  }
};

export default Song;
