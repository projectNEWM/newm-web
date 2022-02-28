import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    inputField: {
      background: string;
      border: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    inputField?: {
      background?: string;
      border?: string;
    };
  }
}

declare module "@mui/material/styles" {
  export interface TypographyVariants {
    tabs: React.CSSProperties;
    formHeader: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  export interface TypographyVariantsOptions {
    tabs?: React.CSSProperties;
    formHeader?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides {
    tabs: true;
    formHeader: true;
  }
}

export default createTheme({
  breakpoints: {
    /* ordering breakpoint values alphabetically breaks functionality */
    /* eslint-disable sort-keys */
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1100,
      xl: 1536,
    },
    /* eslint-enable sort-keys */
  },

  inputField: {
    background: "#151515",
    border: "1px solid #2F2F2F",
  },

  palette: {
    background: {
      default: "#0A0A0A",
      paper: "#0A0A0A",
    },

    primary: {
      main: "#CC33CC",
    },
    secondary: {
      main: "#2C2B71",
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
      font: "normal normal bold 14px/30px Raleway",
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
    h5: {
      fontFamily: "Raleway",
      fontSize:  16,
      fontWeight: 900,
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
