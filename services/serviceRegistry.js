const services = new Map();

function registerService({ serviceName, baseURL, healthCheckURL }) {
  services.set(serviceName, { baseURL, healthCheckURL, healthy: true });
}

function deregisterService(serviceName) {
  services.delete(serviceName);
}

function getService(serviceName) {
  const service = services.get(serviceName);
  return service?.healthy ? service : null;
}

function listServices() {
  return Array.from(services.entries());
}

module.exports = {
  registerService,
  deregisterService,
  getService,
  listServices,
};
