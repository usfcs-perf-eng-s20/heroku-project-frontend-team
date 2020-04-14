const puppeteer = require("puppeteer");
const { URL, screenshotPath, dataTestAttribute } = require("./constants.js");

const TEST_NAME = "search";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${URL}/login`);

  await page.type(dataTestAttribute("email"), "testaccount@gmail.com");
  await page.type(dataTestAttribute("password"), "12345");

  await page.click(dataTestAttribute("login_button"));
  //   await page.click(dataTestAttribute("login_bypass"));

  await page.waitForNavigation();

  await page.waitFor(1000);

  await page.goto(`${URL}/search`);

  await page.screenshot({ path: `${screenshotPath}/${TEST_NAME}_before.png` });

  await page.focus(dataTestAttribute("search-field"));
  await page.keyboard.type("Rainbow Experiment");
  await page.click(dataTestAttribute("search-button"));

  await page.waitForSelector(dataTestAttribute("search-result-1"));

  await page.click(dataTestAttribute("search-result-1"));

  await page.screenshot({ path: `${screenshotPath}/${TEST_NAME}_after.png` });

  await browser.close();
})();
