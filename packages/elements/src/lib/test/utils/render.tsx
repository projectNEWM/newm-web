import { ReactElement } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { WrapperProps } from "@newm-web/utils";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@newm-web/theme";

export const renderWithContext = (
  ui: ReactElement,
  options: RenderOptions = {}
) => {
  const Wrapper = ({ children }: WrapperProps) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};
