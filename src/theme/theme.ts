import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      blue: string;
      purple: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      white: string;
      grey100: string;
      grey200: string;
      grey300: string;
      grey400: string;
      grey500: string;
      black: string;
    };
    gradients: {
      company: string;
      artist: string;
      magazine: string;
      product: string;
      partners: string;
      crypto: string;
    };
    inputField: {
      background: string;
      border: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      blue?: string;
      purple?: string;
      red?: string;
      orange?: string;
      yellow?: string;
      green?: string;
      white?: string;
      grey100?: string;
      grey200?: string;
      grey300?: string;
      grey400?: string;
      grey500?: string;
      black?: string;
    };
    gradients?: {
      company?: string;
      artist?: string;
      magazine?: string;
      product?: string;
      partners?: string;
      crypto?: string;
    };
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
  colors: {
    blue: "#0099CC",
    purple: "#CC33CC",
    red: "#FF3366",
    orange: "#FF9900",
    yellow: "#FFFF66",
    green: "#66FF66",
    white: "#FFFFFF",
    grey100: "#8E8E93",
    grey200: "#636366",
    grey300: "#48484A",
    grey400: "#2C2C2E",
    grey500: "#1C1C1E",
    black: "#000000",
  },
  gradients: {
    company: "linear-gradient(53.48deg, #0099CC 0%, #CC33CC 100%);",
    artist: "linear-gradient(53.48deg, #CC33CC 0%, #FF3366 100%);",
    magazine: "linear-gradient(53.48deg, #FF3366 0%, #FFFF66 100%);",
    product: "linear-gradient(53.48deg, #FF9900 0%, #FF3366 100%);",
    partners: "linear-gradient(53.48deg, #FFFF66 0%, #FF9900 100%);",
    crypto: "linear-gradient(53.48deg, #66FF66 0%, #0099CC 100%);",
  },
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
