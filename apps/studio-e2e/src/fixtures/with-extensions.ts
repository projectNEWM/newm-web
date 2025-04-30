import path from "path";
import fs from "fs";
import { type BrowserContext, test as base, chromium } from "@playwright/test";

/**
 * Creates a reusable Playwright test with specified Chrome extensions.
 *
 * @param extensions - An array of extension names (directory names in the extensions folder).
 * @param storageStatePath - Path to the storage state file, if needed.
 * @returns A Playwright test instance with the specified extensions loaded.
 */
export const createExtensionTest = (
  extensions: string[],
  storageStatePath = ".auth/login.json"
) => {
  return base.extend<{
    context: BrowserContext;
    extensionIds: string[];
  }>({
    context: async ({}, use) => {
      const extensionsDir = path.join(__dirname, "../../extensions");
      const extensionPaths = extensions.map((ext) =>
        path.join(extensionsDir, ext)
      );

      const context = await chromium.launchPersistentContext("", {
        args: [
          `--disable-extensions-except=${extensionPaths.join(",")}`,
          `--load-extension=${extensionPaths.join(",")}`,
          //   "--headless=new",
        ],
        headless: false,
      });

      // Load storage state if provided
      if (storageStatePath && fs.existsSync(storageStatePath)) {
        const storageState = JSON.parse(
          fs.readFileSync(storageStatePath, "utf-8")
        );

        await context.addCookies(storageState.cookies);

        const page = await context.newPage();
        await page.addInitScript((storage) => {
          window.localStorage.clear();
          for (const { key, value } of storage) {
            window.localStorage.setItem(key, value);
          }
        }, storageState.origins[0].localStorage);
        await page.close();
      }

      await use(context);
      await context.close();
    },
    extensionIds: async ({ context }, use) => {
      const extensionIds: string[] = [];

      // For Manifest V3 extensions, extract IDs from service workers
      for (const serviceWorker of context.serviceWorkers()) {
        const extensionId = serviceWorker.url().split("/")[2];
        extensionIds.push(extensionId);
      }

      // Wait for all service workers if needed
      if (extensionIds.length === 0) {
        const backgroundPages = await Promise.all(
          Array.from({ length: context.serviceWorkers().length }, () =>
            context.waitForEvent("serviceworker")
          )
        );
        for (const background of backgroundPages) {
          const extensionId = background.url().split("/")[2];
          extensionIds.push(extensionId);
        }
      }

      await use(extensionIds);
    },
  });
};

// Eternl extension test
export const withEternlTest = createExtensionTest(["eternl"]);
export const withEternlExpect = withEternlTest.expect;

// Yoroi extension test
export const withYoroiTest = createExtensionTest(["yoroi"]);
export const withYoroiExpect = withYoroiTest.expect;

// Nami extension test
export const withNamiTest = createExtensionTest(["nami"]);
export const withNamiExpect = withNamiTest.expect;

// Typhon extension test
export const withTyphonTest = createExtensionTest(["typhon"]);
export const withTyphonExpect = withTyphonTest.expect;
