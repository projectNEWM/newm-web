import AddIcon from "@mui/icons-material/Add";
import { Box, Card, IconButton, useTheme } from "@mui/material";

const AddSongCard = props => {
  const theme = useTheme();
  const { id, handleClick, history } = props;

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
          width: "250px"
        } }
        onClick={ () => history.push(`/home/song/${id}`) }
      >
        <Box
          sx={ {
            alignItems: "center",
            display: "flex",
            height: "inherit",
            justifyContent: "center"
          } }
        >
          <IconButton onClick={ handleClick }>
            <AddIcon sx={ { color: theme.palette.primary.main, fontSize: "40px" } } />
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default AddSongCard;
