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
      fontFamily: string;
      fontStyle: string;
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      padding: string;
      borderWidth: string;
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
  interface MediaQueryStyles {
    "@media (min-width: 900px)"?: React.CSSProperties;
  }

  type CSSPropertiesWithMediaQueries = React.CSSProperties & MediaQueryStyles;
  export interface TypographyVariants {
    tabs: React.CSSProperties;
    formHeader: React.CSSProperties;
    gradient: CSSPropertiesWithMediaQueries;
    heading: CSSPropertiesWithMediaQueries;
    xxs: CSSPropertiesWithMediaQueries;
    xs: CSSPropertiesWithMediaQueries;
    sm: CSSPropertiesWithMediaQueries;
    md: CSSPropertiesWithMediaQueries;
    xxl: CSSPropertiesWithMediaQueries;
    xxxl: CSSPropertiesWithMediaQueries;
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
    gradient?: CSSPropertiesWithMediaQueries;
    heading?: CSSPropertiesWithMediaQueries;
    xxs?: CSSPropertiesWithMediaQueries;
    xs?: CSSPropertiesWithMediaQueries;
    sm?: CSSPropertiesWithMediaQueries;
    md?: CSSPropertiesWithMediaQueries;
    xxl?: CSSPropertiesWithMediaQueries;
    xxxl?: CSSPropertiesWithMediaQueries;
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides {
    tabs: true;
    formHeader: true;
    gradient: true;
    heading: true;
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    xxl: true;
    xxxl: true;
    fontWeightSemiBold: true;
    fontWeightExtraBold: true;
  }
}

const typographyValues = {
  // default fontFamily
  fontFamily: "Inter",
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
  // custom font variants
  xxs: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: "10px",
    lineHeight: "20px",
  },
  xs: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: "12px",
    lineHeight: "20px",
  },
  sm: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "20px",
  },
  md: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "20px",
  },
  xxl: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: "32px",
    lineHeight: "48px",
  },
  xxxl: {
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontSize: "80px",
    lineHeight: "96px",
  },
};

const theme = createTheme({
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
    black100: "#0A0A0A",
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
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    padding: "9px 13px",
    borderWidth: "2px",
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

    action: {
      disabled: "white",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#707070",
    },
  },

  typography: {
    ...typographyValues,
    heading: {
      fontFamily: "Raleway",
      fontSize: typographyValues.xxl.fontSize,
      fontWeight: typographyValues.fontWeightExtraBold,
      lineHeight: typographyValues.xxl.lineHeight,
      "@media (min-width: 900px)": {
        fontSize: typographyValues.xxxl.fontSize,
        lineHeight: typographyValues.xxxl.lineHeight,
      },
    },
    gradient: {
      fontFamily: "DM Serif Text",
      fontSize: typographyValues.xxl.fontSize,
      fontStyle: "italic",
      lineHeight: typographyValues.xxl.lineHeight,
      fontWeight: typographyValues.fontWeightMedium,
      "@media (min-width: 900px)": {
        fontSize: typographyValues.xxxl.fontSize,
        lineHeight: typographyValues.xxxl.lineHeight,
      },
    },
  },
});

export default theme;
