const express = require('express');
const path = require('path');
const { createRequestHandler } = require('@remix-run/express');

const app = express();

// Serve static assets
app.use('/rapportering/build', express.static(path.join(__dirname, 'public/build'), {
    immutable: true,
    maxAge: "1y"
}));

// Serve the generated JS, CSS, and other assets from the build directory
app.use('/rapportering/build', express.static('build', { immutable: true, maxAge: '1y' }));

app.all(
    '*',
    createRequestHandler({
        getLoadContext: () => ({}), // Your context here
        // Ensure the build directory is correctly loaded
        build: require(path.join(__dirname, 'build')),
    })
);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
