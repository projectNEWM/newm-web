import { Box, CardMedia } from "@mui/material";
import { SquareGridCard } from "components";
import { History } from "history";
import { useState } from "react";
import { Transition } from "react-transition-group";
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
    <SquareGridCard onClick={ () => history.push(`/home/song/${songId}`) }>
      <Box p={ 3 } height="100%">
        <CardMedia
          image={ albumImage }
          onMouseEnter={ () => setHover(true) }
          onMouseLeave={ () => setHover(false) }
          style={ {
            borderRadius: "100%",
            height: "100%",
            margin: "auto",
            opacity: "1",
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
                    height: "inherit",
                  } }
                >
                  <SongHover hovering={ hovering } name={ name } />
                </div>
              ) }
            </Transition>
          </Box>
        </CardMedia>
      </Box>
    </SquareGridCard>
  );
};

const duration = 250;

const styles = {
  default: {
    opacity: 0,
    transition: `opacity ${duration}ms ease-in-out`,
  },
  transition: {
    entered: { opacity: 1 },
    entering: { opacity: 1 },
    exited: { opacity: 0 },
    exiting: { opacity: 0 },
  },
};

export default Song;
