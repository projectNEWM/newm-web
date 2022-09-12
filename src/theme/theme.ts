import { Theme, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      blue: string;
      purple: string;
      pink: string;
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
      grey600: string;
      black: string;
      black100: string;
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
      borderWidth: string;
      fontFamily: string;
      fontSize: string;
      fontStyle: string;
      fontWeight: number;
      lineHeight: string;
      maxWidth: string;
      padding: string;
    };
    button: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      blue?: string;
      purple?: string;
      pink?: string;
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
      grey600?: string;
      black?: string;
      black100?: string;
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
      fontFamily?: string;
      fontStyle?: string;
      fontSize?: string;
      fontWeight?: number;
      lineHeight?: string;
      padding?: string;
      borderWidth?: string;
      maxWidth?: string;
    };
    button?: {
      fontSize?: string;
      lineHeight?: string;
      fontWeight?: number;
    };
  }
}

// declare typography custom types
declare module "@mui/material/styles" {
  export interface TypographyVariants {
    tabs: React.CSSProperties;
    formHeader: React.CSSProperties;
    emphasized: React.CSSProperties;
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
  }

  export interface TypographyOptions {
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
  }

  // allow configuration using `createTheme`
  export interface TypographyVariantsOptions {
    tabs?: React.CSSProperties;
    formHeader?: React.CSSProperties;
    emphasized: React.CSSProperties;
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides {
    tabs: true;
    formHeader: true;
    fontWeightSemiBold: true;
    fontWeightExtraBold: true;
  }
}

const colors = {
  blue: "#0099CC",
  purple: "#CC33CC",
  pink: "#DC3CAA",
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
  grey600: "#121214",
  black: "#000000",
  black100: "#0A0A0A",
};

/**
 * Theme without responsive values
 */
const theme = createTheme({
  colors,
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
      sm: 680,
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
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    padding: "9px 13px",
    borderWidth: "2px",
    maxWidth: "340px",
  },

  button: {
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
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
    error: {
      main: "#FF453A",
    },
    success: {
      main: "#30D158",
    },

    action: {
      disabled: "white",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#707070",
    },
  },

  typography: {
    // default fontFamily
    fontFamily: "Inter",

    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    fontWeightExtraBold: 800,

    // customized font variants
    h1: {
      fontFamily: "Raleway",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "80px",
      lineHeight: "96px",
    },
    h3: {
      fontFamily: "Raleway",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "32px",
      lineHeight: "38px",
    },
    h4: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "20px",
    },
    h5: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: "20px",
    },
    h6: {
      fontFamily: "Inter",
      fontSize: "10px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "14.52px",
    },
    body1: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "20px",
    },
    body2: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "22px",
    },
    subtitle1: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      color: colors.grey100,
    },
    subtitle2: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: colors.grey100,
    },

    // custom font theme styles
    emphasized: {
      fontFamily: "DM Serif Text",
      fontStyle: "italic",
      fontWeight: 400,
    },
  },
});

export default theme;
