import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import theme from "@newm-web/theme";

const ErrorMessage = styled(Typography)({
  ...theme.typography.h5,
  color: theme.colors.red,
});

export default ErrorMessage;
