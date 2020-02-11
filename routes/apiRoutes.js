const express = require("express");
const app = express();

const scrape = require("../scrape");

app.get("/all", function(req, res) {
    scrape("politics")
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
