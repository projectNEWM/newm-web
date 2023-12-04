import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import theme from "@newm-web/theme";

const HorizontalLine = styled(Box)`
  background-color: ${theme.colors.grey500};
  height: 1px;
  width: 100%;
`;

export default HorizontalLine;
