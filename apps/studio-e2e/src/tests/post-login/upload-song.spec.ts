import path from "path";
import moment from "moment";
import {
  withEternlExpect,
  withEternlTest,
  withNamiExpect,
  withNamiTest,
  withTyphonExpect,
  withTyphonTest,
  withYoroiExpect,
  withYoroiTest,
} from "../../fixtures/with-extensions";

const AUTOMATION_SHELLY_SECRET = process.env.AUTOMATION_SHELLY_SECRET || "";
const AUTOMATION_WALLET_NAME = process.env.AUTOMATION_WALLET_NAME || "";
const AUTOMATION_WALLET_PASSWORD = process.env.AUTOMATION_WALLET_PASSWORD || "";

/**
 * Generates a unique title string prefixed with the provided wallet name
 * and the current date and time in a formatted string using moment.js.
 *
 * @param {string} [prefix="automation"] - The prefix to be used in the title. Defaults to 'automation'.
 * @returns {string} A unique title in the format '{prefix}-YYYY-MM-DD-HH-mm-ss'.
 */
const uniqueSongTitle = (prefix = "automation") => {
  const date = moment().format("YYYY-MM-DD-HH-mm-ss");

  return `${prefix}-${date}`;
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

withEternlTest("with Eternl wallet", async ({ page, baseURL, context }) => {
  // Navigate to the wallt page
  await page.goto(`${baseURL}/home/wallet`);

  // --- ETERNL WALLET SETUP ---
  const eternlPage = await context.newPage();
  await eternlPage.goto(
    "chrome-extension://dafpbpgbpkbfehdpndjlbjlnloklbdof/index.html#/app/preprod/welcome"
  );
  await eternlPage.waitForLoadState();
  await withEternlExpect(eternlPage).toHaveTitle(
    /Eternl - a Cardano community wallet/
  );
  await eternlPage
    .getByRole("button", { name: "Add Wallet Create or" })
    .click();
  await eternlPage.getByRole("button", { name: "Restore wallet" }).click();
  await eternlPage
    .getByRole("button", { name: "24 words A Shelley wallet" })
    .click();
  await eternlPage.getByRole("button", { name: "Next" }).click();

  const shellyInput = eternlPage.getByLabel("enter word");
  const words = AUTOMATION_SHELLY_SECRET.split(" ");

  // Inser recovery words
  for (const word of words) {
    await shellyInput.fill(word);
    await shellyInput.press("Enter");
  }

  await eternlPage.getByRole("button", { name: "Continue" }).click();
  await eternlPage
    .getByPlaceholder("eg. My shopping wallet")
    .fill(AUTOMATION_WALLET_NAME);
  await eternlPage
    .getByPlaceholder("Enter a strong spending")
    .fill(AUTOMATION_WALLET_PASSWORD);
  await eternlPage
    .getByPlaceholder("Repeat the spending password")
    .fill(AUTOMATION_WALLET_PASSWORD);
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
  await withEternlExpect(alertMessage).toBeVisible();

  // Update wallet address if needed
  const confirmButton = page.locator(
    '[data-testid="confirm-update-wallet-address-button"]'
  );
  if ((await confirmButton.count()) > 0) {
    await confirmButton.click();
  }

  // --- Upload song ---
  const songTitle = uniqueSongTitle("eternl");
  // Ensure the page is loaded using the authenticated session state
  await page.goto("/home/upload-song");

  // Check for the presence of the song file container and upload a file
  const songFileInput = page.locator('[data-testid="song-file-input"]');
  const songFilePath = path.resolve(__dirname, "../../../assets/song.flac");
  await songFileInput.setInputFiles(songFilePath);

  // Check for the presence of the image file container and upload a file
  const imageFileInput = page.locator('[data-testid="image-file-input"]');
  const imageFilePath = path.resolve(__dirname, "../../../assets/coverArt.jpg");
  await imageFileInput.setInputFiles(imageFilePath);

  // Check the checkbox for agreeing to cover art guidelines
  const agreeCheckbox = page.locator(
    'input[name="agreesToCoverArtGuidelines"]'
  );
  await agreeCheckbox.check();

  // Fill in the song title
  await page.fill('input[name="title"]', songTitle);

  // Select genre
  const genreInput = page.locator('input[name="genres"]');
  await genreInput.click();
  await page.keyboard.type("Regional Mexicano");

  const rockOption = page.locator(
    'ul[role="listbox"] >> text=Regional Mexicano'
  );
  await withEternlExpect(rockOption).toBeVisible();
  await rockOption.click();

  // Fill in the description (optional)
  await page.fill(
    'textarea[name="description"]',
    "This is a test song description. Uploaded using Eternl wallet."
  );

  // Check for the minting checkbox and check it
  const mintingCheckbox = page.locator('[data-testid="isMinting"] input');
  await mintingCheckbox.click();

  // Check if the upload button is enabled and click it
  const uploadButton = page.locator('button[type="submit"]:not([disabled])');
  await withEternlExpect(uploadButton).toBeEnabled();

  await page.getByText("Next").click();

  //  Advanced Details
  await page.locator('input[name="releaseDate"]').fill(releaseDate());
  await page.getByText("Next").click();
  await page.waitForLoadState();
  await page.getByRole("heading", { name: "View contract" }).hover();
  await page.getByText("Preview").click();
  await page.getByTestId("CloseIcon").click();
  await page.locator('input[name="isCreator"]').check();
  await page.locator('input[name="agreesToContract"]').check();
  await page.locator('input[name="agreesToDistribution"]').check();
  await page.getByRole("button", { name: "Distribute & Mint" }).click();
  await page.getByRole("button", { name: "Confirm & Pay" }).click();

  withEternlTest.setTimeout(60000);

  const signTransactionPagePromise = context.waitForEvent("page");
  const signTransactionPage = await signTransactionPagePromise;

  await signTransactionPage
    .getByPlaceholder("Enter the spending password")
    .fill(AUTOMATION_WALLET_PASSWORD);

  await signTransactionPage
    .getByRole("button", { exact: true, name: "sign" })
    .click();

  await page.bringToFront();
  await page.waitForURL(/\/home\/library/);
  await withEternlExpect(page.getByText(songTitle)).toBeVisible();
  // --- END: Upload song ---
});

withYoroiTest("with Yoroi wallet", async ({ page, baseURL, context }) => {
  // Navigate to the wallt page
  await page.goto(`${baseURL}/home/wallet`);

  // --- YOROI WALLET SETUP ---
  const yoroiPage = await context.newPage();
  await yoroiPage.goto(
    "chrome-extension://eljcaeehgnlcahfnkhkjdigooakmcbmk/main_window.html"
  );
  await yoroiPage.waitForLoadState();

  await yoroiPage.getByLabel("I agree with Terms of Service").check();

  await yoroiPage.getByRole("button", { name: "Continue" }).click();
  await yoroiPage.getByRole("button", { name: "Skip" }).click();
  await yoroiPage.getByText("I Understand the risk").click();
  await yoroiPage.getByRole("button", { name: "Continue" }).click();
  await yoroiPage.getByRole("button", { name: "Skip" }).click();
  await yoroiPage
    .getByRole("button", { name: "Restore existing wallet" })
    .click();
  await yoroiPage
    .getByRole("button", { name: "Cardano Preprod Testnet" })
    .click();

  await yoroiPage
    .getByRole("button", { name: "24-word recovery phrase 24-" })
    .click();

  const words = AUTOMATION_SHELLY_SECRET.split(" ");

  // Insert recovery words
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const shellyInput = yoroiPage.locator(`#downshift-${i}-input`);

    await shellyInput.fill(word);
    await shellyInput.press("Enter");
  }

  await yoroiPage.getByRole("button", { name: "Next" }).click();
  await yoroiPage.getByRole("button", { name: "Continue" }).click();
  await yoroiPage.getByLabel("Wallet name").fill(AUTOMATION_WALLET_NAME);
  await yoroiPage
    .getByLabel("Password", { exact: true })
    .fill(AUTOMATION_WALLET_PASSWORD);
  await yoroiPage
    .getByLabel("Repeat password")
    .fill(AUTOMATION_WALLET_PASSWORD);
  await yoroiPage.getByRole("button", { name: "Restore" }).click();

  await yoroiPage.waitForLoadState();

  // --- Studio Wallet Connect ---
  await page.getByText("Connect Wallet").click();
  await page.getByRole("button", { name: "Yoroi" }).click();
  // --- END: Studio Wallet Connect ---

  // --- Grant Access ---
  const grantAccessPagePromise = context.waitForEvent("page");
  const grantAccessPage = await grantAccessPagePromise;

  await grantAccessPage
    .getByRole("button", { name: "NEWM Automation EEPS-5187" })
    .click();
  // --- END: Grant Access ---

  await page.bringToFront();

  // Verify successful connection
  const alertMessage = page.getByText("Wallet successfully connected");
  await withYoroiExpect(alertMessage).toBeVisible();

  // Update wallet address if needed
  const confirmButton = page.locator(
    '[data-testid="confirm-update-wallet-address-button"]'
  );
  if ((await confirmButton.count()) > 0) {
    await confirmButton.click();
  }

  // --- Upload song ---
  const songTitle = uniqueSongTitle("yoroi");
  // Ensure the page is loaded using the authenticated session state
  await page.goto("/home/upload-song");

  // Check for the presence of the song file container and upload a file
  const songFileInput = page.locator('[data-testid="song-file-input"]');
  const songFilePath = path.resolve(__dirname, "../../../assets/song.flac");
  await songFileInput.setInputFiles(songFilePath);

  // Check for the presence of the image file container and upload a file
  const imageFileInput = page.locator('[data-testid="image-file-input"]');
  const imageFilePath = path.resolve(__dirname, "../../../assets/coverArt.jpg");
  await imageFileInput.setInputFiles(imageFilePath);

  // Check the checkbox for agreeing to cover art guidelines
  const agreeCheckbox = page.locator(
    'input[name="agreesToCoverArtGuidelines"]'
  );
  await agreeCheckbox.check();

  // Fill in the song title
  await page.fill('input[name="title"]', songTitle);

  // Select genre
  const genreInput = page.locator('input[name="genres"]');
  await genreInput.click();
  await page.keyboard.type("Regional Mexicano");

  const rockOption = page.locator(
    'ul[role="listbox"] >> text=Regional Mexicano'
  );
  await withYoroiExpect(rockOption).toBeVisible();
  await rockOption.click();

  // Fill in the description (optional)
  await page.fill(
    'textarea[name="description"]',
    "This is a test song description. Uploaded using Yoroi wallet."
  );

  // Check for the minting checkbox and check it
  const mintingCheckbox = page.locator('[data-testid="isMinting"] input');
  await mintingCheckbox.click();

  // Check if the upload button is enabled and click it
  const uploadButton = page.locator('button[type="submit"]:not([disabled])');
  await withYoroiExpect(uploadButton).toBeEnabled();

  await page.getByText("Next").click();

  //  Advanced Details
  await page.locator('input[name="releaseDate"]').fill(releaseDate());
  await page.getByText("Next").click();
  await page.waitForLoadState();
  await page.getByRole("heading", { name: "View contract" }).hover();
  await page.getByText("Preview").click();
  await page.getByTestId("CloseIcon").click();
  await page.locator('input[name="isCreator"]').check();
  await page.locator('input[name="agreesToContract"]').check();
  await page.locator('input[name="agreesToDistribution"]').check();
  await page.getByRole("button", { name: "Distribute & Mint" }).click();
  await page.getByRole("button", { name: "Confirm & Pay" }).click();

  withYoroiTest.setTimeout(60000);

  const signTransactionPagePromise = context.waitForEvent("page");
  const signTransactionPage = await signTransactionPagePromise;

  await signTransactionPage
    .getByPlaceholder("Password")
    .fill(AUTOMATION_WALLET_PASSWORD);

  await signTransactionPage.getByText("CONFIRM").click();

  await page.bringToFront();
  await page.waitForURL(/\/home\/library/);
  await withYoroiExpect(page.getByText(songTitle)).toBeVisible();
  // --- END: Upload song ---
});

withNamiTest("with Nami wallet", async ({ page, baseURL, context }) => {
  // Navigate to the wallt page
  await page.goto(`${baseURL}/home/wallet`);

  // --- NAMI WALLET SETUP ---
  const namiPage = await context.newPage();
  await namiPage.goto(
    "chrome-extension://lpfcbjknijpeeillifnkikgncikgfhdo/mainPopup.html"
  );
  await namiPage.getByRole("button", { name: "No thanks" }).click();
  await namiPage.getByRole("button", { name: "Import" }).click();
  await namiPage.getByRole("combobox").selectOption("24-word seed phrase");
  await namiPage.locator("label span").click();

  const [namiImportPhrasePage] = await Promise.all([
    context.waitForEvent("page"), // Listen for the new page event
    namiPage.getByRole("button", { name: "Continue" }).click(), // Action that triggers the new window
  ]);

  const words = AUTOMATION_SHELLY_SECRET.split(" ");

  // Insert recovery words
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const shellyInput = namiImportPhrasePage.getByPlaceholder(`Word ${i + 1}`, {
      exact: true,
    });

    await shellyInput.fill(word);
    await shellyInput.press("Enter");
  }

  await namiImportPhrasePage.getByRole("button", { name: "Next" }).click();
  await namiImportPhrasePage
    .getByPlaceholder("Enter account name")
    .fill(AUTOMATION_WALLET_NAME);
  await namiImportPhrasePage
    .getByPlaceholder("Enter password", { exact: true })
    .fill(AUTOMATION_WALLET_PASSWORD);
  await namiImportPhrasePage
    .getByPlaceholder("Confirm password")
    .fill(AUTOMATION_WALLET_PASSWORD);
  await namiImportPhrasePage.getByRole("button", { name: "Create" }).click();
  await namiImportPhrasePage.getByRole("button", { name: "Close" }).click();

  await namiImportPhrasePage.waitForLoadState();
  await namiPage.waitForLoadState();
  await page.bringToFront();

  // --- Studio Wallet Connect ---
  await page.getByText("Connect Wallet").click();
  await page.getByRole("button", { name: "Nami" }).click();
  // --- END: Studio Wallet Connect ---

  // --- Grant Access ---
  const grantAccessPagePromise = context.waitForEvent("page");
  const grantAccessPage = await grantAccessPagePromise;

  await grantAccessPage.bringToFront();
  await grantAccessPage.getByRole("button", { name: "Access" }).click();
  // --- END: Grant Access ---

  await page.bringToFront();

  // Update wallet address if needed
  const confirmButton = page.locator(
    '[data-testid="confirm-update-wallet-address-button"]'
  );
  if ((await confirmButton.count()) > 0) {
    await confirmButton.click();
  }

  const mismatchEnvModalCloseButton = page.getByTestId("CloseIcon");

  if ((await mismatchEnvModalCloseButton.count()) > 0) {
    await mismatchEnvModalCloseButton.click();
  }

  await namiPage.goto(
    "chrome-extension://lpfcbjknijpeeillifnkikgncikgfhdo/mainPopup.html"
  );
  await namiPage.waitForLoadState();
  await namiPage.bringToFront();

  await namiPage.locator('button[id^="menu-button"]').click();
  await namiPage.getByRole("menuitem", { name: "Settings" }).click();
  await namiPage.getByRole("button", { name: "Network" }).click();
  await namiPage.getByRole("combobox").selectOption("preprod");

  await page.bringToFront();
  await page.waitForLoadState();

  // --- Upload song ---
  const songTitle = uniqueSongTitle("nami");
  // Ensure the page is loaded using the authenticated session state
  await page.goto("/home/upload-song");
  await page.waitForLoadState();

  // Check for the presence of the song file container and upload a file
  const songFileInput = page.locator('[data-testid="song-file-input"]');
  const songFilePath = path.resolve(__dirname, "../../../assets/song.flac");
  await songFileInput.setInputFiles(songFilePath);

  // Check for the presence of the image file container and upload a file
  const imageFileInput = page.locator('[data-testid="image-file-input"]');
  const imageFilePath = path.resolve(__dirname, "../../../assets/coverArt.jpg");
  await imageFileInput.setInputFiles(imageFilePath);

  // Check the checkbox for agreeing to cover art guidelines
  const agreeCheckbox = page.locator(
    'input[name="agreesToCoverArtGuidelines"]'
  );
  await agreeCheckbox.check();

  // Fill in the song title
  await page.fill('input[name="title"]', songTitle);

  // Select genre
  const genreInput = page.locator('input[name="genres"]');
  await genreInput.click();
  await page.keyboard.type("Regional Mexicano");

  const rockOption = page.locator(
    'ul[role="listbox"] >> text=Regional Mexicano'
  );
  await withNamiExpect(rockOption).toBeVisible();
  await rockOption.click();

  // Fill in the description (optional)
  await page.fill(
    'textarea[name="description"]',
    "This is a test song description. Uploaded using Nami wallet."
  );

  // Check for the minting checkbox and check it
  const mintingCheckbox = page.locator('[data-testid="isMinting"] input');
  await mintingCheckbox.click();

  // Check if the upload button is enabled and click it
  const uploadButton = page.locator('button[type="submit"]:not([disabled])');
  await withNamiExpect(uploadButton).toBeEnabled();

  await page.getByText("Next").click();

  //  Advanced Details
  await page.locator('input[name="releaseDate"]').fill(releaseDate());
  await page.getByText("Next").click();
  await page.waitForLoadState();
  await page.getByRole("heading", { name: "View contract" }).hover();
  await page.getByText("Preview").click();
  await page.getByTestId("CloseIcon").click();
  await page.locator('input[name="isCreator"]').check();
  await page.locator('input[name="agreesToContract"]').check();
  await page.locator('input[name="agreesToDistribution"]').check();
  await page.getByRole("button", { name: "Distribute & Mint" }).click();
  await page.getByRole("button", { name: "Confirm & Pay" }).click();

  withNamiTest.setTimeout(60000);

  const signTransactionPagePromise = context.waitForEvent("page");
  const signTransactionPage = await signTransactionPagePromise;

  await signTransactionPage.getByRole("button", { name: "Sign" }).click();

  await signTransactionPage
    .getByPlaceholder("Password")
    .fill(AUTOMATION_WALLET_PASSWORD);

  await signTransactionPage.getByRole("button", { name: "Confirm" }).click();

  await page.bringToFront();
  await page.waitForURL(/\/home\/library/);
  await withNamiExpect(page.getByText(songTitle)).toBeVisible();
  // --- END: Upload song ---
});

withTyphonTest("with Typhon wallet", async ({ page, baseURL, context }) => {
  // Navigate to the wallt page
  await page.goto(`${baseURL}/home/wallet`);

  // --- TYPHON WALLET SETUP ---
  const typhonPage = await context.newPage();
  await typhonPage.goto(
    "chrome-extension://lecpefbhjghfkmjldgojcmgaiedagnlh/tab.html#/wallet/access"
  );
  await typhonPage.waitForLoadState();
  await typhonPage.bringToFront();

  await typhonPage.getByRole("button", { name: "Cardano Mainnet" }).click();
  await typhonPage.getByRole("menuitem", { name: "Cardano Testnet" }).click();
  await typhonPage.getByRole("button", { name: "Import" }).click();

  await typhonPage.waitForLoadState();

  await typhonPage.getByPlaceholder("Wallet Name").fill(AUTOMATION_WALLET_NAME);
  await typhonPage
    .getByPlaceholder("Password", { exact: true })
    .fill(AUTOMATION_WALLET_PASSWORD);
  await typhonPage
    .getByPlaceholder("Confirm Password")
    .fill(AUTOMATION_WALLET_PASSWORD);
  await typhonPage.getByLabel("I agree to Terms and").check();
  await typhonPage.getByRole("button", { name: "Continue" }).click();
  await typhonPage.getByText("24").click();
  await typhonPage.locator("body").press("Tab");

  const words = AUTOMATION_SHELLY_SECRET.split(" ");

  // Inser recovery words
  for (const word of words) {
    await typhonPage.keyboard.type(word);
    await typhonPage.locator("body").press("Enter");
  }

  await typhonPage.getByRole("button", { name: "Unlock Wallet" }).click();
  await typhonPage.waitForLoadState();
  // --- END: TYPHON WALLET SETUP ---

  // --- Studio Wallet Connect ---
  await page.bringToFront();
  await page.getByText("Connect Wallet").click();
  await page.getByRole("button", { name: "Typhon Wallet" }).click();
  // --- END: Studio Wallet Connect ---

  // --- Grant Access ---
  const grantAccessPagePromise = context.waitForEvent("page");
  const grantAccessPage = await grantAccessPagePromise;
  await grantAccessPage.getByRole("button", { name: "Allow" }).click();
  // --- END: Grant Access ---

  await page.bringToFront();

  // Verify successful connection
  const alertMessage = page.getByText("Wallet successfully connected");
  await withTyphonExpect(alertMessage).toBeVisible();

  // Update wallet address if needed
  const confirmButton = page.locator(
    '[data-testid="confirm-update-wallet-address-button"]'
  );
  if ((await confirmButton.count()) > 0) {
    await confirmButton.click();
  }

  // --- Upload song ---
  const songTitle = uniqueSongTitle("typhon");
  // Ensure the page is loaded using the authenticated session state
  await page.goto("/home/upload-song");

  // Check for the presence of the song file container and upload a file
  const songFileInput = page.locator('[data-testid="song-file-input"]');
  const songFilePath = path.resolve(__dirname, "../../../assets/song.flac");
  await songFileInput.setInputFiles(songFilePath);

  // Check for the presence of the image file container and upload a file
  const imageFileInput = page.locator('[data-testid="image-file-input"]');
  const imageFilePath = path.resolve(__dirname, "../../../assets/coverArt.jpg");
  await imageFileInput.setInputFiles(imageFilePath);

  // Check the checkbox for agreeing to cover art guidelines
  const agreeCheckbox = page.locator(
    'input[name="agreesToCoverArtGuidelines"]'
  );
  await agreeCheckbox.check();

  // Fill in the song title
  await page.fill('input[name="title"]', songTitle);

  // Select genre
  const genreInput = page.locator('input[name="genres"]');
  await genreInput.click();
  await page.keyboard.type("Regional Mexicano");

  const rockOption = page.locator(
    'ul[role="listbox"] >> text=Regional Mexicano'
  );
  await withTyphonExpect(rockOption).toBeVisible();
  await rockOption.click();

  // Fill in the description (optional)
  await page.fill(
    'textarea[name="description"]',
    "This is a test song description. Uploaded using Typhon wallet."
  );

  // Check for the minting checkbox and check it
  const mintingCheckbox = page.locator('[data-testid="isMinting"] input');
  await mintingCheckbox.click();

  // Check if the upload button is enabled and click it
  const uploadButton = page.locator('button[type="submit"]:not([disabled])');
  await withTyphonExpect(uploadButton).toBeEnabled();

  await page.getByText("Next").click();

  //  Advanced Details
  await page.locator('input[name="releaseDate"]').fill(releaseDate());
  await page.getByText("Next").click();
  await page.waitForLoadState();
  await page.getByRole("heading", { name: "View contract" }).hover();
  await page.getByText("Preview").click();
  await page.getByTestId("CloseIcon").click();
  await page.locator('input[name="isCreator"]').check();
  await page.locator('input[name="agreesToContract"]').check();
  await page.locator('input[name="agreesToDistribution"]').check();
  await page.getByRole("button", { name: "Distribute & Mint" }).click();
  await page.getByRole("button", { name: "Confirm & Pay" }).click();

  withTyphonTest.setTimeout(60000);

  const signTransactionPagePromise = context.waitForEvent("page");
  const signTransactionPage = await signTransactionPagePromise;

  await signTransactionPage
    .getByRole("button", { exact: true, name: "Sign" })
    .click();

  await signTransactionPage
    .getByPlaceholder("Password")
    .fill(AUTOMATION_WALLET_PASSWORD);

  await signTransactionPage.getByRole("button", { name: "Confirm" }).click();

  await page.bringToFront();
  await page.waitForURL(/\/home\/library/);
  await withTyphonExpect(page.getByText(songTitle)).toBeVisible();
  // --- END: Upload song ---
});
