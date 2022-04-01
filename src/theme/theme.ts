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

// declare typography custom types
declare module "@mui/material/styles" {
  export interface TypographyVariants {
    tabs: React.CSSProperties;
    formHeader: React.CSSProperties;
    xxsBold: React.CSSProperties;
    xxsMedium: React.CSSProperties;
    xsBold: React.CSSProperties;
    xsMedium: React.CSSProperties;
    sBold: React.CSSProperties;
    sMedium: React.CSSProperties;
    sRegular: React.CSSProperties;
    mBold: React.CSSProperties;
    mMedium: React.CSSProperties;
    mRegular: React.CSSProperties;
    xxlExtraBold: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  export interface TypographyVariantsOptions {
    tabs?: React.CSSProperties;
    formHeader?: React.CSSProperties;
    xxsBold?: React.CSSProperties;
    xxsMedium?: React.CSSProperties;
    xsBold?: React.CSSProperties;
    xsMedium?: React.CSSProperties;
    sBold?: React.CSSProperties;
    sMedium?: React.CSSProperties;
    sRegular?: React.CSSProperties;
    mBold?: React.CSSProperties;
    mMedium?: React.CSSProperties;
    mRegular?: React.CSSProperties;
    xxlExtraBold?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides {
    tabs: true;
    formHeader: true;
    xxsBold: true;
    xxsMedium: true;
    xsBold: true;
    xsMedium: true;
    sBold: true;
    sMedium: true;
    sRegular: true;
    mBold: true;
    mMedium: true;
    mRegular: true;
    xxlExtraBold: true;
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
    // default fontFamily 
    fontFamily: "Inter",
    // custom font styles 
    xxsBold: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "10px",
      lineHeight: "20px",
    },
    xxsMedium: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "10px",
      lineHeight: "20px",
    },
    xsBold: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "12px",
      lineHeight: "20px",
    },
    xsMedium: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "20px",
    },
    sBold: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "14px",
      lineHeight: "20px",
    },
    sMedium: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "20px",
    },
    sRegular: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "20px",
    },
    mBold: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "20px",
    },
    mMedium: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "20px",
    },
    mRegular: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "20px",
    },
    xxlExtraBold: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "800",
      fontSize: "32px",
      lineHeight: "20px",
    },
  },
});
