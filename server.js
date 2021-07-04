const express = require('express');
const app = express();
const data = require('./dataCowork.json');
const cities = require('./dataCity');
const port = process.env.PORT || 3000;

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable

app.get('/', (req, res) => {
  res.send('Hello, welcome Hackton X fievrr API');
});

app.get('/datacowork', (req, res) => {
  res.status(200).json(data.results);
});

app.get('/cities', (req, res) => {
  res.status(200).json(cities.results);
});

app.get('/datacowork/:id', (req, res) => {
  const dataCowork = data.results.find((d) => d.id == req.params.id);
  if (dataCowork) {
    res.status(200).send(dataCowork);
  } else {
    res.status(404).send(`not found...`);
  }
});

// Grab the blacklist from the command-line so that we can update the blacklist without deploying
// again. CORS Anywhere is open by design, and this blacklist is not used, except for countering
// immediate abuse (e.g. denial of service). If you want to block all origins except for some,
// use originWhitelist instead.
var originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);
function parseEnvList(env) {
  if (!env) {
    return [];
  }
  return env.split(',');
}

// Set up rate-limiting to avoid abuse of the public CORS Anywhere server.
var checkRateLimit = require('./lib/rate-limit')(
  process.env.CORSANYWHERE_RATELIMIT
);

var cors_proxy = require('./lib/cors-anywhere');
cors_proxy
  .createServer({
    originBlacklist: originBlacklist,
    originWhitelist: originWhitelist,
    requireHeader: ['origin', 'x-requested-with'],
    checkRateLimit: checkRateLimit,
    removeHeaders: [
      'cookie',
      'cookie2',
      // Strip Heroku-specific headers
      'x-request-start',
      'x-request-id',
      'via',
      'connect-time',
      'total-route-time',
      // Other Heroku added debug headers
      // 'x-forwarded-for',
      // 'x-forwarded-proto',
      // 'x-forwarded-port',
    ],
    redirectSameOrigin: true,
    httpProxyOptions: {
      // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
      xfwd: false,
    },
  })
  .listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  });
