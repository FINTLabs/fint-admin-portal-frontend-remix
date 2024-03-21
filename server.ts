const express = require('express');
const { createRequestHandler } = require('@remix-run/express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy setup for API requests
app.use('/api', createProxyMiddleware({
    target: 'https://admin-beta.fintlabs.no', // Point this to your Java app
    changeOrigin: true,
    pathRewrite: {'^/api': ''}, // Adjust based on your backend API's routing needs
    secure: true, // Set to false only if you're dealing with self-signed certificates
}));

// Serve the static files built by Remix
app.use(express.static('public'));

// Handle all other requests with Remix
app.all('*', createRequestHandler({
    // Options for the Remix request handler
}));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Express server started on http://localhost:${port}`);
});
