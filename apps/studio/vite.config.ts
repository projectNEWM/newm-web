/// <reference types='vitest' />
import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/studio",

  plugins: [react(), nxViteTsPaths()],

  preview: {
    host: "localhost",
    port: 4300,
  },

  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
    host: "localhost",
    port: 3000,
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ tsConfigPaths() ],
  // },
});
