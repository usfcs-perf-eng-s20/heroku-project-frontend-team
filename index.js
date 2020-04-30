const express = require("express");
const path = require("path");

const logger = require("heroku-logger");
const { exec } = require("child_process");

// Tests
const searchTest = require("./performance/search");
// End Tests

const app = express();

const defaultIntervalTime = 600000; // 10minutes

let isRunningPerformance = false;
let shouldRunPerformance = true;

const tests = [searchTest];

function runPerformance() {
  if (!shouldRunPerformance) return;
  tests.forEach((test) => {
    console.log("Running test:");
    test({
      shouldTakeScreenshot: false,
      shouldSendMetrics: true,
      shouldBeHeadless: true,
    });
  });
}

let interval = null;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

app.get("/startPerformance", (req, res) => {
  if (isRunningPerformance)
    return res.send("Performance tests already running.");

  let setIntervalTime = req.query.interval || defaultIntervalTime;

  console.log(`Running performance tests every ${setIntervalTime} ms`);
  res.send(`Running performance tests every ${setIntervalTime} ms`);
  interval = setInterval(runPerformance, setIntervalTime);
  isRunningPerformance = true;
  runPerformance();
});

app.get("/stopPerformance", (req, res) => {
  if (!isRunningPerformance)
    return res.send("Performance are already NOT running.");

  console.log("Stopping performance tests.");
  res.send("Stopping performance tests.");
  clearInterval(interval);
  isRunningPerformance = false;
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Password generator listening on ${port}`);
  if (shouldRunPerformance) {
    interval = setInterval(runPerformance, defaultIntervalTime);
    isRunningPerformance = true;
    console.log(
      `Performance tests are running every ${defaultIntervalTime} ms.`
    );
    runPerformance();
  }
});
