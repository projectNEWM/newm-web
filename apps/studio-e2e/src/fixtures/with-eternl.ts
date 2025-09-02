import path from "path";
import fs from "fs";
import { type BrowserContext, test as base, chromium } from "@playwright/test";

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, "../../extensions/eternl");
    const storageStatePath = ".auth/login.json";

    const context = await chromium.launchPersistentContext("", {
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        "--headless=new",
      ],
      headless: false,
    });

    // Load storage state if it exists
    if (fs.existsSync(storageStatePath)) {
      await context.addCookies(
        JSON.parse(fs.readFileSync(storageStatePath, "utf-8")).cookies
      );
      const page = await context.newPage();
      const storageState = JSON.parse(
        fs.readFileSync(storageStatePath, "utf-8")
      );
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
  extensionId: async ({ context }, use) => {
    // For Manifest V3 extensions
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
});

export const expect = test.expect;
