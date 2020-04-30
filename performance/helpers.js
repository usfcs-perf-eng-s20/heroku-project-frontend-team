const axios = require("axios");

const {
  URL,
  dataTestAttribute,
  metricKeys,
  edrEndpoint,
} = require("./constants.js");

async function login(page) {
  await page.goto(`${URL}/login`);

  await page.type(dataTestAttribute("email"), "testaccount@gmail.com");
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

  console.log("Ready to save data");

  // axios
  //   .post(edrEndpoint, {
  //     method: "N/A",
  //     path: TEST_NAME,
  //     processingTimeInMiliseconds: results.TimestampDelta,
  //     responseCode: "500",
  //     serviceName: "frontend",
  //     success: true,
  //     timestamp: endMetrics.Timestamp,
  //     username: "505",
  //   })
  //   .then(() => {
  //     console.log("Successfully sent to EDR.");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     exit();
  //   });
}

function parseOptions(arguments) {
  const slicedArgs = arguments.slice(2);

  const options = {
    shouldTakeScreenshot: slicedArgs.includes("-s"),
    shouldSendMetrics: !slicedArgs.includes("--nometrics"),
    shouldBeHeadless: slicedArgs.includes("--headless"),
  };

  return options;
}

module.exports = {
  login,
  sendMetrics,
  parseOptions,
};
