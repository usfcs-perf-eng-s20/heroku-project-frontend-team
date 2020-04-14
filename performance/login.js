const puppeteer = require("puppeteer");
const { URL, screenshotPath, dataTestAttribute } = require("./constants.js");

const TEST_NAME = "login";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${URL}/login`);

  await page.screenshot({ path: `${screenshotPath}/${TEST_NAME}_before.png` });

  await page.type(dataTestAttribute("email"), "testaccount@gmail.com");
  await page.type(dataTestAttribute("password"), "12345");

  await page.click(dataTestAttribute("login_button"));
  //   await page.click(dataTestAttribute("login_bypass"));

  await page.waitForNavigation();

  await page.waitFor(1000);

  await page.screenshot({ path: `${screenshotPath}/${TEST_NAME}_after.png` });

  await browser.close();
})();
