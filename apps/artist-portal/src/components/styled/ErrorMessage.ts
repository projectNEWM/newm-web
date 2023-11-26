import { Typography } from "@newm.io/studio/elements";
import { styled } from "@mui/material/styles";
import theme from "@newm.io/theme";

const ErrorMessage = styled(Typography)({
  ...theme.typography.h5,
  color: theme.colors.red,
});

export default ErrorMessage;
