import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 900,
  padding: "34px 0 40px 0",
  width: "100%",
}));
export default StyledTypography;
