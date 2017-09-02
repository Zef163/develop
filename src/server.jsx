let express = require("express"),
    app = express(),
    path = require("path"),
    port = 3000;

app.all("*", function(req, res) {
    let {url} = req;

    // Content files
    if (String(url).match(/(.*?)\.(json|js|jsx)$/i) !== null) {
        res.sendFile(path.join(__dirname + "/../dist" + url));
    } else {
        res.sendFile(path.join(__dirname + "/../dist/index.html"));
    }
});

app.listen(port);
console.log("Server listening http://localhost:" + port);