import AddIcon from "@mui/icons-material/Add";
import { Box, Card, IconButton, useTheme } from "@mui/material";
import { History } from "history";
import { useState } from "react";
import { SwitchTransition } from "react-transition-group";
import AddSongSVG from "assets/images/AddSong";
import { FadeTransition } from "components";

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
          <SwitchTransition mode="out-in">
            <FadeTransition
              key={ hovering ? "bar" : "foo" }
              timeout={ 100 }
              unmountOnExit
              mountOnEnter
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
            </FadeTransition>
          </SwitchTransition>
        </Box>
      </Card>
    </>
  );
};

export default AddSongCard;
