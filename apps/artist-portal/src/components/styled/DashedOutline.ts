import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import theme from "theme";

const DashedOutline = styled(Box)`
  background-color: ${theme.colors.grey700};
  border-radius: 4px;
  border: 2px dashed ${theme.colors.grey400};
  &:hover {
    background-color: ${theme.colors.grey600};
  }
`;

export default DashedOutline;
