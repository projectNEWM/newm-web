import "@testing-library/jest-dom";

jest.mock("@newm-web/env", () => ({
  APPLE_CLIENT_ID: "EXAMPLE_ID",
  GOOGLE_CLIENT_ID: "EXAMPLE_ID",
  GA_STUDIO_ID: "EXAMPLE_ID",
  NX_CLOUD_ACCESS_TOKEN: "EXAMPLE_TOKEN",
  NODE_ENV: "test",
  ENV: "test",
  isProd: false
}));
