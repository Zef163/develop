let express = require("express"),
    app = express(),
    path = require("path"),
    port = 3000;

// Static files
app.use(express.static(path.resolve(__dirname, "..", "client")));

// Error handler
app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// Web application
app.all("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
});

// Run listener
app.listen(port, function () {
    console.log("Server run on http://localhost:" + port);
});
