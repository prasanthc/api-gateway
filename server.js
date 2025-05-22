const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./services/authMiddleware');
const rateLimiter = require('./services/rateLimiter');
const proxyHandler = require('./services/proxyRouter');
const { registerService } = require('./services/serviceRegistry');
const { startHealthChecks } = require('./services/healthChecker');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res)=>{
  res.send("API Gateway up and running!")
});

// Service registration
app.post('/register', (req, res) => {
  const { serviceName, baseURL, healthCheckURL } = req.body;
  if (!serviceName || !baseURL || !healthCheckURL) {
    return res.status(400).send('Missing fields');
  }
  registerService({ serviceName, baseURL, healthCheckURL });
  res.send('Service registered');
});

// Proxying
app.use('/api/:serviceName/*', authMiddleware, rateLimiter, proxyHandler);

startHealthChecks();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
