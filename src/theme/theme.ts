import { Theme, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      baseBlue: string;
      baseGreen: string;
      baseOrange: string;
      basePink: string;
      basePurple: string;
      baseYellow: string;
      black: string;
      blue: string;
      company: string;
      crypto: string;
      green: string;
      grey100: string;
      grey200: string;
      grey300: string;
      grey400: string;
      grey500: string;
      grey600: string;
      grey700: string;
      magazine: string;
      music: string;
      partners: string;
      red: string;
      white: string;
      yellow: string;
    };
    gradients: {
      company: string;
      crypto: string;
      magazine: string;
      music: string;
      newm: string;
      partners: string;
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
      baseBlue?: string;
      baseGreen?: string;
      baseOrange?: string;
      basePink?: string;
      basePurple?: string;
      baseYellow?: string;
      black?: string;
      blue?: string;
      company?: string;
      crypto?: string;
      green?: string;
      grey100?: string;
      grey200?: string;
      grey300?: string;
      grey400?: string;
      grey500?: string;
      grey600?: string;
      grey700?: string;
      magazine?: string;
      music?: string;
      partners?: string;
      red?: string;
      white?: string;
      yellow?: string;
    };
    gradients?: {
      company?: string;
      crypto?: string;
      magazine?: string;
      music?: string;
      newm?: string;
      partners?: string;
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
  baseBlue: "#5091EB",
  baseGreen: "#41BE91",
  baseOrange: "#FF6E32",
  basePink: "#F53C69",
  basePurple: "#C341F0",
  baseYellow: "#FFC33C",
  black: "#000000",
  blue: "#3985F7",
  company: "#8C69F0",
  crypto: "#46AABE",
  green: "#68CD67",
  grey100: "#8E8E93",
  grey200: "#636366",
  grey300: "#48484A",
  grey400: "#2C2C2E",
  grey500: "#1C1C1E",
  grey600: "#121214",
  grey700: "#0A0A0A",
  magazine: "#FA554B",
  music: "#DC3CAA",
  partners: "#FF9637",
  red: "#EB5545",
  white: "#FFFFFF",
  yellow: "#F9D74A",
};

/**
 * Theme without responsive values
 */
const theme = createTheme({
  colors,
  gradients: {
    company: "linear-gradient(53.48deg, #5091EB 0%, #C341F0 100%);",
    crypto: "linear-gradient(53.48deg, #41BE91 0%, #5091EB 100%);",
    magazine: "linear-gradient(53.48deg, #F53C69 0%, #FF6E32 100%);",
    music: "linear-gradient(53.48deg, #C341F0 0%, #F53C69 100%);",
    // eslint-disable-next-line max-len
    newm: "linear-gradient(45.38deg, #FFC33C 14.22%, #FF6E32 28.39%, #F53C69 42.57%, #C341F0 56.74%, #5091EB 70.91%, #41BE91 85.83%);",
    partners: "linear-gradient(53.48deg, #FF6E32 0%, #FFC33C 100%);",
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
      default: colors.black,
      paper: colors.black,
    },

    primary: {
      main: colors.basePink,
    },
    secondary: {
      main: colors.music,
    },
    error: {
      main: colors.red,
    },
    success: {
      main: colors.green,
    },
    info: {
      main: colors.baseBlue,
    },
    warning: {
      main: colors.yellow,
    },

    action: {
      disabled: colors.white,
    },

    text: {
      primary: colors.white,
      secondary: colors.grey100,
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
      lineHeight: "18px",
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

const { breakpoints } = theme;

/**
 * Theme with responsive values using defined breakpoints
 */
const responsiveTheme: Theme = {
  ...theme,
  typography: {
    ...theme.typography,
    h1: {
      ...theme.typography.h1,
      [breakpoints.down("md")]: {
        fontSize: "32px",
        lineHeight: "48px",
      },
    },
  },
};

export default responsiveTheme;
