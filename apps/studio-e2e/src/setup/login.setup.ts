import { test as loginSetup } from "@playwright/test";

const username = process.env.E2E_TEST_USERNAME || "";
const password = process.env.E2E_TEST_PASSWORD || "";
const authFile = ".auth/login.json";

loginSetup("login-setup", async ({ page, baseURL }) => {
  // Navigate to the login page
  await page.goto(`${baseURL}/login`);

  // await page.waitForURL(/\/login/);

  // Fill in valid login credentials
  await page.fill("input[name=\"email\"]", username);
  await page.fill("input[name=\"password\"]", password);
  await page.click("button[type=\"submit\"]");

  await page.waitForURL(/\/home\/upload-song/);

  // write storage and session data to disk
  await page.context().storageState({ path: authFile });
});
