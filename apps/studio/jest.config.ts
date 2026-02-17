/* eslint-disable */
export default {
  displayName: "studio",
  preset: "../../jest.preset.js",
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nx/react/plugins/jest",
    "^.+\\.[tj]sx?$": ["babel-jest", { presets: ["@nx/react/babel"] }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/packages/studio",
  transformIgnorePatterns: ["node_modules/(?!(@dexhunterio/swaps)/)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests"],
};
