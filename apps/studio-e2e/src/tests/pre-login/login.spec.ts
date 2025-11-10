import { expect, test } from "@playwright/test";

test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto("/login");
  });

  test("should load the login page and display the correct elements", async ({
    page,
  }) => {
    // Check if the login form is visible
    await expect(page.locator("form")).toBeVisible();

    // Check for input fields
    await expect(page.locator("input[name=\"email\"]")).toBeVisible();
    await expect(page.locator("input[name=\"password\"]")).toBeVisible();

    // Check for the login button
    await expect(page.locator("button[type=\"submit\"]")).toBeVisible();
  });

  test("should show an error message for invalid login", async ({ page }) => {
    // Fill in invalid credentials
    await page.fill("input[name=\"email\"]", "invalid@example.com");
    await page.fill("input[name=\"password\"]", "wrongpassword");

    // Click the login button
    await page.click("button[type=\"submit\"]");

    // Check for the error message in the alert
    const alertMessage = page.locator(".MuiAlert-message");
    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toHaveText("Invalid username or password");
  });
});
