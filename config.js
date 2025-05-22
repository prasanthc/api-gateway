require('dotenv').config();

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret',
  },
  rateLimit: {
    points: parseInt(process.env.RATE_LIMIT_POINTS) || 100,
    duration: parseInt(process.env.RATE_LIMIT_DURATION) || 60,
  },
  healthCheckInterval: parseInt(process.env.HEALTH_CHECK_INTERVAL) || 30000,
};
