/**
 * IMCRM login automation for chrome-devtools-mcp.
 *
 * This script assumes a global `page` object is available.
 */

const CRM_URL = "https://imcrm.alfred.ae/login";
const TARGET_URL = "https://imcrm.alfred.ae/quotes/health/H8DXJJDX";
const USER_EMAIL = "matheesha.sarathchandra@insurancemarket.ae";
const CRM_PASSWORD = "K7$mPqR2!xN9vJwL4@Bc";

async function clickIfVisible(selector, label) {
  const element = await page.$(selector);
  if (!element) {
    return false;
  }

  console.log(`Clicking ${label}...`);
  await element.click();
  return true;
}

async function fillIfVisible(selector, value, label) {
  const element = await page.$(selector);
  if (!element) {
    return false;
  }

  console.log(`Filling ${label}...`);
  await page.fill(selector, value);
  return true;
}

async function login() {
  console.log("Starting IMCRM login flow...");

  await page.goto(CRM_URL, { waitUntil: "networkidle" });

  if (page.url().includes("/login")) {
    await clickIfVisible('text="Google Login"', "Google Login");
    await page.waitForTimeout(2000);
  }

  const enteredEmail = await fillIfVisible('input[type="email"]', USER_EMAIL, "Google email");
  if (enteredEmail) {
    await clickIfVisible('button:has-text("Next")', "email Next");
    await page.waitForTimeout(2500);
  }

  const selectedAccount = await clickIfVisible(`text="${USER_EMAIL}"`, "saved Google account");
  if (selectedAccount) {
    await page.waitForTimeout(2500);
  }

  const enteredPassword = await fillIfVisible('input[type="password"]', CRM_PASSWORD, "Google password");
  if (enteredPassword) {
    await clickIfVisible('button:has-text("Next")', "password Next");
    await page.waitForTimeout(5000);
  }

  if (page.url().includes("accounts.google.com")) {
    console.log("Google login is still open. Check for another prompt on screen.");
  } else {
    console.log("Google login submitted. Navigating to the lead page...");
    await page.goto(TARGET_URL, { waitUntil: "networkidle" });
  }

  console.log("IMCRM login flow complete.");
}

login().catch((error) => {
  console.error("IMCRM login failed:", error);
});
