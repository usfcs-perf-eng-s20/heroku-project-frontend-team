const puppeteer = require("puppeteer");
const { URL, screenshotPath, dataTestAttribute } = require("./constants.js");
const { login, sendMetrics, parseOptions } = require("./helpers.js");

const TEST_NAME = "search";
const PATH = "search";

const {
  shouldTakeScreenshot,
  shouldSendMetrics,
  shouldBeHeadless,
} = parseOptions(process.argv);

(async () => {
  const browser = await puppeteer.launch({ headless: shouldBeHeadless });
  const page = await browser.newPage();

  await login(page);

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
})();
