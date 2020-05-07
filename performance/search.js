const puppeteer = require("puppeteer");
const randomMovies = [
  "thought",
  "roses",
  "blue",
  "yellow",
  "green",
  "Fake ID",
  "James Bond",
  "Curb",
];

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
  const randomMovie =
    randomMovies[Math.floor(Math.random() * randomMovies.length)];

  const page = await browser.newPage();

  const startMetrics = shouldSendMetrics && (await page.metrics());

  await signUp(page, randomID);
  const endSignUpMetrics = shouldSendMetrics && (await page.metrics());

  await login(page, randomID);
  const endLoginMetrics = shouldSendMetrics && (await page.metrics());

  await page.goto(`${URL}/${PATH}`);

  if (shouldTakeScreenshot)
    await page.screenshot({
      path: `${screenshotPath}/${TEST_NAME}_before.png`,
    });

  // Enter on search field
  await page.focus(dataTestAttribute("search-input"));
  await page.keyboard.type(randomMovie);
  await page.click(dataTestAttribute("search-button"));

  // Wait until results come in
  await page.waitForSelector(dataTestAttribute("search-result-0"));

  // Click on result
  await page.click(dataTestAttribute("search-result-1"));

  const endSearchResultMetrics = shouldSendMetrics && (await page.metrics());

  // Wait for Loading
  await page.waitForSelector(dataTestAttribute("movie-info"));
  const loadMovieInfoMetrics = shouldSendMetrics && (await page.metrics());

  // Favorite
  await page.click(dataTestAttribute("favorite"));
  await page.waitForSelector(dataTestAttribute("favorited"));
  const endFavoritedMetrics = shouldSendMetrics && (await page.metrics());

  // Checkout
  await page.click(dataTestAttribute("checkout"));
  await page.waitForSelector(dataTestAttribute("checkedout"));
  const endCheckedOutMetrics = shouldSendMetrics && (await page.metrics());

  // Logout
  await page.click(dataTestAttribute("nav-logout"));
  await page.waitForSelector(dataTestAttribute("nav-logout"));

  const endSearchTestsMetrics = shouldSendMetrics && (await page.metrics());

  const results = {
    signUp: endSignUpMetrics.Timestamp - startMetrics.Timestamp,
    login: endLoginMetrics.Timestamp - endSignUpMetrics.Timestamp,
    search: endSearchResultMetrics.Timestamp - endLoginMetrics.Timestamp,
    loadMovieInfo:
      loadMovieInfoMetrics.Timestamp - endSearchResultMetrics.Timestamp,
    favorited: endFavoritedMetrics.Timestamp - loadMovieInfoMetrics.Timestamp,
    checkdout: endCheckedOutMetrics.Timestamp - endFavoritedMetrics.Timestamp,
    logout: endSearchTestsMetrics.Timestamp - endCheckedOutMetrics.Timestamp,
    total: endSearchTestsMetrics.Timestamp - startMetrics.Timestamp,
  };

  logger.info(`product_end2end tests`, {
    serviceName: "frontend",
    results,
    userId: randomID,
    searchQuery: randomMovie,
  });

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
