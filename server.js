const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

app.use(express.static("build"));

app.all('/favicon.ico', function (req, res) {
    res.sendFile('build/favicon.ico');
});

app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '/build') })
})

app.listen(port, "localhost", () => {
    console.log(`server started on port ${port}`);
});