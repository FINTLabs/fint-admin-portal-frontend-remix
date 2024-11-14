const express = require('express');
const path = require('path');
const { createRequestHandler } = require('@remix-run/express');

const app = express();

// Serve static assets
app.use('/rapportering/build', express.static(path.join(__dirname, 'public/build'), {
    immutable: true,
    maxAge: "1y"
}));
app.use('/rapportering/build', express.static('build', { immutable: true, maxAge: '1y' }));

// Handle all other requests with Remix
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
