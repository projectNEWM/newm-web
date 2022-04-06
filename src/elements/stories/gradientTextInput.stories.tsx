import { Stack } from "@mui/material";
import GradientTextInput from "../GradientTextInput";

export default {
  title: "Gradient Text Input",
  component: GradientTextInput,
};

export const Variations = () => (
  <Stack mt={ 2 } direction="column" spacing={ 4 } display="flex">
    <GradientTextInput textAlign="center" autoFocus />
    <GradientTextInput textAlign="center" errorMessage="With error message" />
  </Stack>
);
