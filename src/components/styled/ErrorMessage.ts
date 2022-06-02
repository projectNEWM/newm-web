import { Typography } from "elements";
import { styled } from "@mui/material/styles";
import theme from "theme";

const ErrorMessage = styled(Typography)({
  ...theme.typography.h5,
  color: theme.palette.error.main,
});

export default ErrorMessage;
