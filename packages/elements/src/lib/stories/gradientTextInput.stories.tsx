import { useRef } from "react";
import { Stack } from "@mui/material";
import GradientTextInput from "../GradientTextInput";

export default {
  component: GradientTextInput,
  title: "Gradient Text Input",
};

export const Variations = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Stack direction="column" display="flex" mt={ 2 } spacing={ 4 }>
      <GradientTextInput ref={ inputRef } textAlign="center" />
      <GradientTextInput errorMessage="With error message" textAlign="center" />
    </Stack>
  );
};
