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
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1060,
      xl: 1536,
    },
  },

  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        // enables useMediaQuery() value to update when used in components
        noSsr: true,
      },
    },
  },

  inputField: {
    background: "#151515",
    border: "1px solid #2F2F2F",
  },

  palette: {
    background: {
      default: "#000000",
      paper: "#000000",
    },

    primary: {
      main: "#FF3366",
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
      fontWeight: 500,
    },
    button: {
      font: "normal normal bold 16px/30px Raleway",
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
      fontWeight: 600,
    },
    h5: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      lineHeight: "1.5rem",
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
