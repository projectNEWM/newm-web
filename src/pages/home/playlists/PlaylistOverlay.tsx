import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Edit } from '@mui/icons-material';

const Background = styled(Box)({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  opacity: 1,
  backgroundColor: "rgba(10, 10, 10, 0.5)",
});

const PlaylistOverlay: FunctionComponent = () => {
  return (
    <Background>
      <Edit sx={ { fontSize: "64px", fill: "white" } } />
    </Background>
  );
}

export default PlaylistOverlay;
