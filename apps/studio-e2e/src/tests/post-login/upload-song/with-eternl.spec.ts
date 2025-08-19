import path from "path";
import moment from "moment";
import {
  expect,
  test as withEternlExtension,
} from "../../../fixtures/with-eternl";

const ETERNL_SHELLY_SECRET = process.env.ETERNL_SHELLY_SECRET || "";
const ETERNL_WALLET_NAME = process.env.ETERNL_WALLET_NAME || "";
const ETERNL_WALLET_PASSWORD = process.env.ETERNL_WALLET_PASSWORD || "";

/**
 * Generates a unique song title string prefixed with 'automation' and
 * the current date and time in a formatted string using moment.js.
 *
 * @returns {string} A unique song title in the format 'automation-YYYY-MM-DD-HH-MM-SS'.
 */
const uniqueSongTitle = () => {
  const date = moment().format("YYYY-MM-DD-HH-mm-ss");
  return `automation-${date}`;
};

/**
 * Calculates the earliest release date by adding a specified number of days
 * to the current date and formats it as "yyyy-mm-dd".
 *
 * @returns {string} The formatted release date in "yyyy-mm-dd" format.
 */
const releaseDate = () => {
  const earliestReleaseDate = moment().add(20, "days");

  // Format the date in "yyyy-mm-dd"
  return earliestReleaseDate.format("YYYY-MM-DD");
};

withEternlExtension("Upload song", async ({ page, baseURL, context }) => {
  // Navigate to the wallt page
  await page.goto(`${baseURL}/home/wallet`);

  // --- ETERNL WALLET SETUP ---
  const eternlPage = await context.newPage();
  await eternlPage.goto(
    "chrome-extension://dafpbpgbpkbfehdpndjlbjlnloklbdof/index.html#/app/preprod/welcome"
  );
  await eternlPage.waitForLoadState();
  await expect(eternlPage).toHaveTitle(/Eternl - a Cardano community wallet/);
  await eternlPage
    .getByRole("button", { name: "Add Wallet Create or" })
    .click();
  await eternlPage.getByRole("button", { name: "Restore wallet" }).click();
  await eternlPage
    .getByRole("button", { name: "24 words A Shelley wallet" })
    .click();
  await eternlPage.getByRole("button", { name: "Next" }).click();

  const shellyInput = eternlPage.getByLabel("enter word");
  const words = ETERNL_SHELLY_SECRET.split(" ");

  // Inser recovery words
  for (const word of words) {
    await shellyInput.fill(word);
    await shellyInput.press("Enter");
  }

  await eternlPage.getByRole("button", { name: "Continue" }).click();
  await eternlPage
    .getByPlaceholder("eg. My shopping wallet")
    .fill(ETERNL_WALLET_NAME);
  await eternlPage
    .getByPlaceholder("Enter a strong spending")
    .fill(ETERNL_WALLET_PASSWORD);
  await eternlPage
    .getByPlaceholder("Repeat the spending password")
    .fill(ETERNL_WALLET_PASSWORD);
  await eternlPage.getByRole("button", { name: "Save" }).click();
  await eternlPage.getByRole("button", { name: "Save" }).click();

  await eternlPage.waitForLoadState();

  await eternlPage
    .getByRole("button", { name: "DApp Browser Connect to" })
    .click();
  await eternlPage.getByRole("button", { name: "Connect Account" }).click();
  await eternlPage
    .getByRole("button", { name: "Connect as dApp Account" })
    .click();
  // --- END: ETERNL WALLET SETUP ---

  // --- Studio Wallet Connect ---
  await page.getByText("Connect Wallet").click();
  await page.getByRole("button", { name: "Eternl" }).click();
  // --- END: Studio Wallet Connect ---

  // --- Grant Access ---
  const grantAccessPagePromise = context.waitForEvent("page");
  const grantAccessPage = await grantAccessPagePromise;
  await grantAccessPage.getByText("Grant Access").click();
  // --- END: Grant Access ---

  await page.bringToFront();

  // Verify successful connection
  const alertMessage = page.getByText("Wallet successfully connected");
  await expect(alertMessage).toBeVisible();

  // Update wallet address if needed
  const confirmButton = page.locator(
    "[data-testid=\"confirm-update-wallet-address-button\"]"
  );
  if ((await confirmButton.count()) > 0) {
    await confirmButton.click();
  }

  // --- Upload song ---
  const songTitle = uniqueSongTitle();
  // Ensure the page is loaded using the authenticated session state
  await page.goto("/home/upload-song");

  // Check for the presence of the song file container and upload a file
  const songFileInput = page.locator("[data-testid=\"song-file-input\"]");
  const songFilePath = path.resolve(__dirname, "../../../../assets/song.flac");
  await songFileInput.setInputFiles(songFilePath);

  // Check for the presence of the image file container and upload a file
  const imageFileInput = page.locator("[data-testid=\"image-file-input\"]");
  const imageFilePath = path.resolve(
    __dirname,
    "../../../../assets/coverArt.jpg"
  );
  await imageFileInput.setInputFiles(imageFilePath);

  // Check the checkbox for agreeing to cover art guidelines
  const agreeCheckbox = page.locator(
    "input[name=\"agreesToCoverArtGuidelines\"]"
  );
  await agreeCheckbox.check();

  // Fill in the song title
  await page.fill("input[name=\"title\"]", songTitle);

  // Select genre
  const genreInput = page.locator("input[name=\"genres\"]");
  await genreInput.click();
  await page.keyboard.type("Regional Mexicano");

  const rockOption = page.locator(
    "ul[role=\"listbox\"] >> text=Regional Mexicano"
  );
  await expect(rockOption).toBeVisible();
  await rockOption.click();

  // Fill in the description (optional)
  await page.fill(
    "textarea[name=\"description\"]",
    "This is a test song description. Uploaded using Eternl wallet."
  );

  // Check for the minting checkbox and check it
  const mintingCheckbox = page.locator("[data-testid=\"isMinting\"] input");
  await mintingCheckbox.click();

  // Check if the upload button is enabled and click it
  const uploadButton = page.locator("button[type=\"submit\"]:not([disabled])");
  await expect(uploadButton).toBeEnabled();

  await page.getByText("Next").click();

  //  Advanced Details
  await page.locator("input[name=\"releaseDate\"]").fill(releaseDate());
  await page.getByText("Next").click();
  await page.waitForLoadState();
  await page.getByRole("heading", { name: "View contract" }).hover();
  await page.getByText("Preview").click();
  await page.getByTestId("CloseIcon").click();
  await page.locator("input[name=\"isCreator\"]").check();
  await page.locator("input[name=\"agreesToContract\"]").check();
  await page.locator("input[name=\"agreesToDistribution\"]").check();
  await page.getByRole("button", { name: "Distribute & Mint" }).click();
  await page.getByRole("button", { name: "Confirm & Pay" }).click();

  withEternlExtension.setTimeout(60000);

  const signTransactionPagePromise = context.waitForEvent("page");
  const signTransactionPage = await signTransactionPagePromise;

  await signTransactionPage
    .getByPlaceholder("Enter the spending password")
    .fill(ETERNL_WALLET_PASSWORD);

  await signTransactionPage
    .getByRole("button", { exact: true, name: "sign" })
    .click();

  await page.bringToFront();
  await page.waitForURL(/\/home\/library/);
  await expect(page.getByText(songTitle)).toBeVisible();
  // --- END: Upload song ---
});
