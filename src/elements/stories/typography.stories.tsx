import { Stack } from "@mui/material";
import Typography from "../Typography";

export default {
  title: "Typography",
  component: Typography,
};

export const Variants = () => (
  <Stack mt={ 2 } direction="column" spacing={ 2 }>
    <Typography variant="xxs">Text xxs</Typography>
    <Typography variant="xs">Text xs</Typography>
    <Typography variant="md">Text md</Typography>
    <Typography variant="xxl">Text xxl</Typography>
  </Stack>
);
