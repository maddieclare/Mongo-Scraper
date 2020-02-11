const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/onion_db";
mongoose.connect(MONGODB_URI);
const Article = require("./models/articles.js");

const PORT = process.env.PORT || 3000;

// Express setup
const app = express();

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

require("./routes/htmlRoutes");
require("./routes/apiRoutes");

// Start the server
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}!`);
});

let scrape = function(category) {
  let queryUrl = `https://www.theonion.com/${category}`;
  let results = [];
  return axios.get(queryUrl).then(function(response) {
    let $ = cheerio.load(response.data);

    let listItems = $("div.sc-17uq8ex-0 article").each(function(i, element) {
      let title = $(element)
        .find(".cw4lnv-5 a h2")
        .text();
      let category = $(element)
        .find(".cw4lnv-12 a span").first()
        .text();
      let link = $(element)
        .find(".cw4lnv-5 a")
        .attr("href");
      let time = $(element)
        .find(".sc-3nbvzd-0:first-child")
        .text();

      if (title !== "") {
        results.push({
          title: title,
          category: category,
          link: link,
          time: time
        });
      }
    });

    return results;
  });
};

app.get("/all", function(req, res) {
  scrape("latest")
    .then(function(foundArticles) {
      foundArticles.forEach(function(eachArticle) {
        Article.create(eachArticle).catch(function(err) {
          console.log(err.message);
        });
      });
      res.send(foundArticles);
    })
    .catch(function(err) {
      res.json(err);
    });
});
