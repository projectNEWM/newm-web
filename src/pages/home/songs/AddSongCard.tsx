import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, useTheme } from "@mui/material";
import AddSongSVG from "assets/images/AddSong";
import { FadeTransition, SquareGridCard } from "components";
import { History } from "history";
import { useState } from "react";
import { SwitchTransition } from "react-transition-group";

interface AddSongCardProps {
  id: string;
  albumImage: string;
  handleClick: () => void;
  history: History;
}

const AddSongCard = (props: AddSongCardProps) => {
  const theme = useTheme();
  const { id, handleClick, history } = props;
  const [hovering, setHover] = useState(false);
  return (
    <>
      <SquareGridCard onClick={ () => history.push(`/home/song/${id}`) }>
        <SwitchTransition mode="out-in">
          <FadeTransition
            key={ hovering ? "bar" : "foo" }
            timeout={ 100 }
            unmountOnExit
            mountOnEnter
          >
            <Box
              onMouseEnter={ () => setHover(true) }
              onMouseLeave={ () => setHover(false) }
              sx={ {
                alignItems: "center",
                display: "flex",
                height: "100%",
                justifyContent: "center",
                width: "100%",
              } }
            >
              <IconButton
                onClick={ handleClick }
                sx={ { color: theme.palette.primary.main } }
              >
                { hovering
                  ? <AddIcon sx={ { fontSize: "40px" } } />
                  : <AddSongSVG />
                }
              </IconButton>
            </Box>
          </FadeTransition>
        </SwitchTransition>
      </SquareGridCard>
    </>
  );
};

export default AddSongCard;
