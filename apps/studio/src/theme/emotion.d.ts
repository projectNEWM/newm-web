import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    typography: {
      fontWeightMedium: string;
      fontWeightRegular: string;
    };
  }
}
