// node-rate-limiter-flexible
// count and limit number of actions by key and protects from DDoS and brite force attaque at any scale
// npm -s i rate-limiter-flexible



// BASIC EXEMPLE
const express = require('express');
const Redis = require('ioredis');
const redisClient = new Redis({ enableOfflineQueue: false });

const app = express();

const rateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  points: 10, // Number of points
  duration: 1, // Per second
});

const rateLimiterMiddleware = (req, res, next) => {
   rateLimiterRedis.consume(req.ip)
      .then(() => {
          next();
      })
      .catch(_ => {
          res.status(429).send('Too Many Requests');
      });
   };

app.use(rateLimiterMiddleware);

// main repos
// https://github.com/animir/node-rate-limiter-flexible

// many exemple
// https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example

// integrate node-rate-limiter with passport strategy
// https://github.com/passport/express-4.x-local-example/blob/67e0f735fc6d2088d7aa9b8c4eb25bc0052653ec/server-secure.js
