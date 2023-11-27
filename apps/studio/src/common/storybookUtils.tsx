import { Story as StorybookStory } from "@storybook/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@newm.io/theme";

export const withContext = (Story: StorybookStory) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);
