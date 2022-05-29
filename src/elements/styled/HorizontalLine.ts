import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import theme from "theme";

const HorizontalLine = styled(Box)`
  background: ${theme.colors.grey500};
  height: 1px;
  width: 100%;
`;

export default HorizontalLine;
