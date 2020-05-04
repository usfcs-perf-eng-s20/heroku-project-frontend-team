const puppeteer = require("puppeteer");
const {
  URL,
  DEVURL,
  screenshotPath,
  dataTestAttribute,
} = require("./constants.js");
const { login, signUp, sendMetrics, parseOptions } = require("./helpers.js");

const TEST_NAME = "search";
const PATH = "search";

const argumentOptions = parseOptions(process.argv);

const searchTest = async (options) => {
  const { shouldTakeScreenshot, shouldSendMetrics, shouldBeHeadless } =
    options || argumentOptions;

  const browser = await puppeteer.launch({
    headless: shouldBeHeadless,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const randomID =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

  const page = await browser.newPage();

  await signUp(page, randomID);
  await login(page, randomID);

  const startMetrics = shouldSendMetrics ? await page.metrics() : null;

  await page.goto(`${URL}/${PATH}`);

  if (shouldTakeScreenshot)
    await page.screenshot({
      path: `${screenshotPath}/${TEST_NAME}_before.png`,
    });

  await page.focus(dataTestAttribute("search-input"));
  await page.keyboard.type("Rainbow Experiment");
  await page.click(dataTestAttribute("search-button"));

  await page.waitForSelector(dataTestAttribute("search-result-1"));

  await page.click(dataTestAttribute("search-result-1"));

  const endMetrics = shouldSendMetrics ? await page.metrics() : null;

  if (shouldSendMetrics) sendMetrics(TEST_NAME, startMetrics, endMetrics);

  if (shouldTakeScreenshot)
    await page.screenshot({
      path: `${screenshotPath}/${TEST_NAME}_after.png`,
    });

  await browser.close();
};

if (argumentOptions.shouldRun) searchTest();

module.exports = (options = {}) => {
  searchTest(options);
};
