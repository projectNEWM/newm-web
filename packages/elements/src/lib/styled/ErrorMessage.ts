import theme from "@newm-web/theme";
import { styled } from "@mui/material/styles";
import Typography from "../Typography";

const ErrorMessage = styled(Typography)({
  ...theme.typography.h5,
  color: theme.colors.red,
});

export default ErrorMessage;
