const { createProxyMiddleware } = require('http-proxy-middleware');
const { getService } = require('./serviceRegistry');

function proxyHandler(req, res, next) {
  const serviceName = req.params.serviceName;
  const service = getService(serviceName);

  if (!service) return res.status(502).send('Service unavailable');

  return createProxyMiddleware({
    target: service.baseURL,
    changeOrigin: true,
    pathRewrite: {
      [`^/api/${serviceName}`]: '',
    },
  })(req, res, next);
}

module.exports = proxyHandler;
