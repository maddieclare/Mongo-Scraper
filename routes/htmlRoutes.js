const express = require("express");
var app = express();

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});
