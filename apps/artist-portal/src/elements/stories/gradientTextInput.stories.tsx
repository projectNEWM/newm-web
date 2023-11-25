import { useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import GradientTextInput from "../GradientTextInput";

export default {
  title: "Gradient Text Input",
  component: GradientTextInput,
};

export const Variations = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <Stack mt={ 2 } direction="column" spacing={ 4 } display="flex">
      <GradientTextInput textAlign="center" ref={ inputRef } />
      <GradientTextInput textAlign="center" errorMessage="With error message" />
    </Stack>
  );
};
