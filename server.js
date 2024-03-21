const express = require('express');
const path = require('path');
const { createRequestHandler } = require('@remix-run/express');

const app = express();

// Serve static assets
app.use(express.static('public'));

// Assuming your build directory is correctly set up by `npm run build`
const BUILD_DIR = path.join(process.cwd(), 'build');

app.use(
    '/build',
    express.static('build', { immutable: true, maxAge: '1y' })
);

app.all(
    '*',
    createRequestHandler({
        getLoadContext: () => ({}), // Adjust according to your needs
        build: require(BUILD_DIR),
    })
);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
