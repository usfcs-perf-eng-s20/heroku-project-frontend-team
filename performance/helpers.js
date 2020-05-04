const axios = require("axios");
const logger = require("heroku-logger");

const { URL, dataTestAttribute, metricKeys } = require("./constants.js");

async function signUp(page, randomID) {
  await page.goto(`${URL}/login`);

  await page.type(dataTestAttribute("email"), `${randomID}@gmail.com`);
  await page.type(dataTestAttribute("password"), "12345");

  await page.click(dataTestAttribute("signup"));

  await page.type(dataTestAttribute("userName"), `${randomID}`);
  await page.type(dataTestAttribute("age"), "1234");
  await page.type(dataTestAttribute("city"), "City");

  await page.click(dataTestAttribute("signUp_button"));

  await page.waitFor(1000);
}

async function login(page, randomID) {
  await page.goto(`${URL}/login`);

  await page.type(dataTestAttribute("email"), `${randomID}@gmail.com`);
  await page.type(dataTestAttribute("password"), "12345");

  await page.click(dataTestAttribute("login_button"));

  await page.waitForNavigation();
}

async function sendMetrics(
  TEST_NAME,
  startMetrics,
  endMetrics,
  additionalData = {}
) {
  const metricResults = metricKeys.reduce((acc, metric) => {
    acc[metric + "Delta"] = endMetrics[metric] - startMetrics[metric];
    return acc;
  }, {});

  const results = {
    ...metricResults,
    ...additionalData,
  };

  logger.info(`${TEST_NAME} tests`, { serviceName: "frontend", results });
}

function parseOptions(arguments) {
  const slicedArgs = arguments.slice(2);

  const options = {
    shouldTakeScreenshot: slicedArgs.includes("-s"),
    shouldSendMetrics: !slicedArgs.includes("--nometrics"),
    shouldBeHeadless: slicedArgs.includes("--headless"),
    shouldRun: slicedArgs.includes("-r"),
    isDev: slicedArgs.includes("-d"),
  };

  return options;
}

module.exports = {
  signUp,
  login,
  sendMetrics,
  parseOptions,
};
