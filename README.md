# Lightweight API Gateway in Node.js

A lightweight API Gateway built with Node.js and Express. It includes:

- Dynamic service registration
- JWT authentication
- IP/user-based rate limiting
- HTTP proxying to registered services
- Periodic health checks for services

## 🔧 Features

1. **Service Registration**  
   POST to `/register` with:
   ```json
   {
     "serviceName": "users",
     "baseURL": "http://localhost:4000",
     "healthCheckURL": "http://localhost:4000/health"
   }
   ```

2. **Routing**  
   Any API request to `/api/{serviceName}/*` is routed to the registered service.

3. **JWT Authentication**  
   Add `Authorization: Bearer <token>` to all API requests.

4. **Rate Limiting**  
   Based on IP or user (via JWT `sub` claim).

5. **Health Checks**  
   Every 30s, registered services are pinged via their `healthCheckURL`.

## 📦 Setup

```bash
git clone https://github.com/your-username/lightweight-api-gateway.git
cd lightweight-api-gateway
cp .env.example .env
npm install
npm start
```

## 📬 API Routes

| Method | Endpoint        | Description              |
|--------|------------------|--------------------------|
| POST   | `/register`      | Register a new service   |
| ANY    | `/api/:service/*`| Proxy to registered svc  |

## 🛡 JWT Token Example (HS256)

```js
const jwt = require("jsonwebtoken");
const token = jwt.sign({ sub: "user123" }, "your-secret", { expiresIn: "1h" });
```

## 💡 Future Work

- Redis-backed service registry and rate limiter
- JWKS dynamic key support
- Service discovery via Consul or etcd
