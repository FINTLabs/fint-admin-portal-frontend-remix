const express = require('express');
const path = require('path');
const { createRequestHandler } = require('@remix-run/express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const target = process.env.API_URL || "http://localhost:8080";

console.log("Taget api: ",target)

if (!target) {
    throw new Error('Missing API_URL environment variable. Please set it to a valid URL.');
}

app.use('/api', createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
}));

// Serve static assets
app.use('/rapportering/build', express.static(path.join(__dirname, 'public/build'), {
    immutable: true,
    maxAge: "1y"
}));
app.use('/rapportering/build', express.static('build', { immutable: true, maxAge: '1y' }));

app.all('*', createRequestHandler({
    getLoadContext() {
        return {};
    },
    mode: process.env.NODE_ENV,
}));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
