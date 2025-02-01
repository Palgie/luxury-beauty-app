const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Basic CORS setup
app.use(cors());

// Proxy configuration
const proxyMiddleware = createProxyMiddleware({
  target: 'https://horizon-api.www.lookfantastic.com',
  changeOrigin: true,
  secure: true,
  timeout: 60000,
  proxyTimeout: 60000,
  ws: false,
  followRedirects: true,
  headers: {
    'Content-Type': 'application/json',
    'x-trust-client-ip-key': '9hvnhUPKhOnK1deuXuSNduGh',
    'x-altitude-instance': 'lookfantastic',
    'x-horizon-client': 'luxury-storefront',
    'x-trusted-client-ip': '151.101.1.1'
  },
  onProxyReq: (proxyReq, req) => {
    // Log the request for debugging
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    
    // Let the proxy middleware handle the body automatically
    // This avoids double parsing and potential corruption
  },
  onProxyRes: (proxyRes, req, res) => {
    // Log the response status for debugging
    console.log(`${new Date().toISOString()} Response Status: ${proxyRes.statusCode}`);
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err.message);
    res.status(500).json({
      errors: [{
        message: 'Proxy Error',
        extensions: {
          code: err.code || 'UNKNOWN_ERROR',
          originalError: err.message
        }
      }]
    });
  }
});

// Handle all GraphQL requests - no body parsing middleware needed
app.use('/graphql', proxyMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log('Target API: https://horizon-api.www.lookfantastic.com');
});

// Basic error handling
process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
