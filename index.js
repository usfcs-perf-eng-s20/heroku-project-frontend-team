const express = require("express");
const path = require("path");
const { exec } = require("child_process");
const pino = require("pino");
const logger = pino({
  prettifier: require("pino-colada"),
});

const app = express();

const defaultIntervalTime = 600000; // 10minutes

let isRunningPerformance = false;

const tests = ["search"];

function runPerformance() {
  tests.forEach((test) => {
    logger.info("Running", test, "performance test...");
    exec(`node performance/${test}.js --headless`, (error, stdout, stderr) => {
      if (error) {
        logger.info(`${test}: FAIL, `, error);
        return;
      }
      if (stderr) {
        logger.info(`${test}: FAIL, `, stderr);
        return;
      }
      logger.info(`${test}: SUCCESS`, stdout);
    });
    logger.info("----");
  });
}

let interval = null;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

app.get("/startPerformance", (req, res) => {
  if (isRunningPerformance)
    return res.send("Performance tests already running.");

  let setIntervalTime = req.query.interval || defaultIntervalTime;

  logger.info(`Running performance tests every ${setIntervalTime} ms`);
  res.send(`Running performance tests every ${setIntervalTime} ms`);
  interval = setInterval(runPerformance, setIntervalTime);
  isRunningPerformance = true;
  runPerformance();
});

app.get("/stopPerformance", (req, res) => {
  if (!isRunningPerformance)
    return res.send("Performance are already NOT running.");

  logger.info("Stopping performance tests.");
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
  logger.info(`Password generator listening on ${port}`);
  interval = setInterval(runPerformance, defaultIntervalTime);
  isRunningPerformance = true;
  logger.info(`Performance tests are running every ${defaultIntervalTime} ms.`);
  runPerformance();
});
