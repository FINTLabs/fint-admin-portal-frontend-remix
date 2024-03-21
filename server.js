const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { createRequestHandler } = require('@remix-run/express');

const app = express();

// Define the target for your Java backend
const JAVA_API_URL = 'http://localhost'; // Adjust this URL to your Java backend

// Proxy middleware to forward /api requests to the Java backend
app.use('/api', createProxyMiddleware({
    target: JAVA_API_URL,
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // Optional: rewrite /api to / if needed
}));

// Serve static assets
app.use('/rapportering/build', express.static(path.join(__dirname, 'public/build'), {
    immutable: true,
    maxAge: "1y"
}));
app.use('/rapportering/build', express.static('build', { immutable: true, maxAge: '1y' }));

// Handle all other requests with Remix
app.all('*', createRequestHandler({
    getLoadContext: () => ({}), // Your context here
    build: require(path.join(__dirname, 'build')),
}));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
