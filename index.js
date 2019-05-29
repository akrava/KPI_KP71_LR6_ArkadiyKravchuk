const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = process.env["PORT"] || 8080;

app.listen(PORT, () => console.log('Server started at port:', PORT));

app.use(express.static('dist'));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use((err, _req, res) => {
    console.error(err.stack);
    res.status(500).end(`Internal srever error: ${err.message}`);
});