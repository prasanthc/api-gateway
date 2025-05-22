const { RateLimiterMemory } = require('rate-limiter-flexible');
const { rateLimit } = require('../config');

const limiter = new RateLimiterMemory({
  points: rateLimit.points,
  duration: rateLimit.duration,
});

function rateLimiter(req, res, next) {
  const key = req.user?.sub || req.ip;
  limiter.consume(key)
    .then(() => next())
    .catch(() => res.status(429).send('Too Many Requests'));
}

module.exports = rateLimiter;
