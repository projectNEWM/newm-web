import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import theme from "theme";

<<<<<<< HEAD
const HorizontalLine = styled(Box)`
  background: ${theme.colors.grey500};
=======
const HorizontalLine = styled.div`
  background-color: ${theme.colors.grey500};
>>>>>>> master
  height: 1px;
  width: 100%;
`;

export default HorizontalLine;
