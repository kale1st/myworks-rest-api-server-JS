const express = require("express");
const path = require("path");
const app = express();

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
  index: ["index.html"],
  maxAge: "1m",
  redirect: false,
};
app.use(express.static("public", options));

// #############################################################################
// Catch all handler for all other request.
app.use("*", (req, res) => {
  res
    .json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params,
    })
    .end();
});
const port = process.env.PORT || 3000;

app.get("/newuser", (req, res) => {
  res.send("elhamdülillah");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
