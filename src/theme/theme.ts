import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#0A0A0A",
      paper: "#0A0A0A",
    },
    primary: {
      main: "#CC33CC",
    },
    secondary: {
      main: "#CC33CC",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#707070",
    },
  },
  typography: {
    body1: {
      fontFamily: "Montserrat",
      fontSize: 14,
    },
    button: {
      textTransform: "none",
    },
    fontFamily: "Montserrat",
    fontSize: 14,
    formHeader: {
      fontFamily: "Raleway",
      fontSize: 16,
      fontWeight: 900,
    },
    h2: {
      fontFamily: "Raleway",
      fontSize: 30,
      fontWeight: 600,
    },
    h6: {
      fontFamily: "Roboto",
      fontSize: 12,
    },
    tabs: {
      fontFamily: "Raleway",
      fontSize: 14,
      fontWeight: 900,
    },
  },
});

declare module "@mui/material/styles/createTypography" {
  export interface TypographyOptions {
    formHeader: TypographyStyleOptions;
    tabs: TypographyStyleOptions;
  }
}
