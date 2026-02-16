const express = require("express");
const request = require("request");
const app = express();

app.get("/:stream(*)", (req, res) => {
  const stream = req.params.stream;
  const url = `https://channel.singtelcast.com/out/v1/empcg-singtel-cast3-prdiz-channel-group-default/${stream}`;

  const headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 10; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.61 Mobile Safari/537.36",
  };

  req.pipe(request({ url, headers })).on("response", response => {
    res.set(response.headers);
  }).on("error", err => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy request failed.");
  }).pipe(res);
});

// Export handler Vercel can use
module.exports = app;
module.exports.handler = require("serverless-http")(app);
