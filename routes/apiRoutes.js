const scrape = require("../scrape");
const Article = require("./../models/articles");
const router = require("express").Router();

router.get("/all", function(req, res) {
  scrape("entertainment")
    .then(function(foundArticles) {
      foundArticles.forEach(function(eachArticle) {
        Article.create(eachArticle).catch(function(err) {
          console.log(err.message);
        });
      });
      res.json(foundArticles);
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;