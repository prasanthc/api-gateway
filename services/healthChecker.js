const axios = require('axios');
const { listServices, deregisterService, registerService } = require('./serviceRegistry');
const { healthCheckInterval } = require('../config');

function startHealthChecks() {
  setInterval(async () => {
    for (const [name, { baseURL, healthCheckURL }] of listServices()) {
      try {
        await axios.get(healthCheckURL, { timeout: 2000 });
        console.log(`Health check passed for ${name}`);
        registerService({ serviceName: name, baseURL, healthCheckURL });
      } catch {
        console.warn(`Health check failed for ${name}`);
        deregisterService(name);
      }
    }
  }, healthCheckInterval);
}

module.exports = { startHealthChecks };
