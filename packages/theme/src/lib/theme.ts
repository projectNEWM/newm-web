import { Theme, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    button: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
    };
    colors: {
      activeBackground: string;
      backdropBlur: string;
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
      activeBackground: string;
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
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    button?: {
      fontSize?: string;
      fontWeight?: number;
      lineHeight?: string;
    };
    colors?: {
      activeBackground?: string;
      backdropBlur?: string;
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
      activeBackground?: string;
      company?: string;
      crypto?: string;
      magazine?: string;
      music?: string;
      newm?: string;
      partners?: string;
    };
    inputField?: {
      borderWidth?: string;
      fontFamily?: string;
      fontSize?: string;
      fontStyle?: string;
      fontWeight?: number;
      lineHeight?: string;
      maxWidth?: string;
      padding?: string;
    };
  }
}

// declare typography custom types
declare module "@mui/material/styles" {
  export interface TypographyVariants {
    emphasized: React.CSSProperties;
    fontWeightExtraBold: number;
    fontWeightSemiBold: number;
    formHeader: React.CSSProperties;
    tabs: React.CSSProperties;
  }

  export interface TypographyOptions {
    fontWeightExtraBold: number;
    fontWeightSemiBold: number;
  }

  // allow configuration using `createTheme`
  export interface TypographyVariantsOptions {
    emphasized: React.CSSProperties;
    fontWeightExtraBold: number;
    fontWeightSemiBold: number;
    formHeader?: React.CSSProperties;
    tabs?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides {
    fontWeightExtraBold: true;
    fontWeightSemiBold: true;
    formHeader: true;
    tabs: true;
  }
}

const colors = {
  activeBackground: "#FFFFFF1A",
  backdropBlur: "#121214CC",
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
  breakpoints: {
    values: {
      lg: 1280,
      md: 960,
      sm: 600,
      xl: 1600,
      xs: 0,
    },
  },
  button: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "18px",
  },
  colors,
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        // enables useMediaQuery() value to update when used in components
        noSsr: true,
      },
    },
  },

  gradients: {
    activeBackground: "linear-gradient(53deg, #C341F014 0%, #F53C6914 100%)",
    company: "linear-gradient(53.48deg, #5091EB 0%, #C341F0 100%)",
    crypto: "linear-gradient(53.48deg, #41BE91 0%, #5091EB 100%)",
    magazine: "linear-gradient(53.48deg, #F53C69 0%, #FF6E32 100%)",
    music: "linear-gradient(53.48deg, #C341F0 0%, #F53C69 100%)",

    // * 'newm' uses an adjusted NEWM gradient to visually match the CTA design.
    // * Slight deviation from Figma's var(--Gradients-Gradient-NEWM-45).
    // * Meets the same intent as the design pattern.
    // eslint-disable-next-line max-len
    newm: "linear-gradient(12deg, #FFC33C 0%, #FF6E32 24%, #F53C69 41%, #C341F0 59%, #5091EB 70%, #41BE91 90%)",
    partners: "linear-gradient(53.48deg, #FF6E32 0%, #FFC33C 100%)",
  },

  inputField: {
    borderWidth: "2px",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    maxWidth: "340px",
    padding: "9px 13px",
  },

  palette: {
    action: {
      disabled: colors.white,
    },

    background: {
      default: colors.black,
      paper: colors.black,
    },
    error: {
      main: colors.red,
    },
    info: {
      main: colors.baseBlue,
    },
    primary: {
      main: colors.basePink,
    },
    secondary: {
      main: colors.music,
    },
    success: {
      main: colors.green,
    },

    text: {
      primary: colors.white,
      secondary: colors.grey100,
    },

    warning: {
      main: colors.yellow,
    },
  },

  typography: {
    // custom font theme styles
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    emphasized: {
      fontFamily: "DM Serif Text",
      fontStyle: "italic",
      fontWeight: 400,
    },

    // default fontFamily
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    fontFamily: "Inter",

    fontWeightBold: 700,

    fontWeightExtraBold: 800,

    fontWeightMedium: 500,

    fontWeightRegular: 400,

    fontWeightSemiBold: 600,

    // customized font variants
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    body1: {
      fontFamily: "Inter",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "20px",
    },

    body2: {
      fontFamily: "Inter",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "22px",
    },
    h1: {
      fontFamily: "Raleway",
      fontSize: "80px",
      fontStyle: "normal",
      fontWeight: 800,
      lineHeight: "96px",
    },

    h2: {
      fontFamily: "Raleway",
      fontSize: "36px",
      fontStyle: "normal",
      fontWeight: 800,
      lineHeight: "46px",
    },

    h3: {
      fontFamily: "Raleway",
      fontSize: "32px",
      fontStyle: "normal",
      fontWeight: 800,
      lineHeight: "38px",
    },

    h4: {
      fontFamily: "Inter",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "20px",
    },

    h5: {
      fontFamily: "Inter",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "20px",
    },

    h6: {
      fontFamily: "Inter",
      fontSize: "10px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "14.52px",
    },

    subtitle1: {
      color: colors.grey100,
      fontFamily: "Inter",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "20px",
    },

    subtitle2: {
      color: colors.grey100,
      fontFamily: "Inter",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "18px",
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
    h2: {
      ...theme.typography.h2,
      [breakpoints.down("md")]: {
        fontSize: "28px",
        lineHeight: "36px",
      },
    },
  },
};

export default responsiveTheme;
