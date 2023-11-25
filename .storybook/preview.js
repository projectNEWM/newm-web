import { withContext } from "@newm.io/studio/common";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "dark",
    values: [
      {
        name: "light",
        value: "#fff",
      },
      {
        name: "dark",
        value: "#000",
      },
    ],
  },
};

export const decorators = [withContext];
