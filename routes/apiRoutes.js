const scrape = require("../scrape");
const Article = require("./../models/articles");

module.exports = function (app) {
  app.get("/api/all", function(req, res) {
    scrape("entertainment", "1")
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
  
  app.get("/api/favourites", function(req, res) {
    Article.find({favourite: true}).then(function(favourites) {
      res.send(favourites);
    })
  })

  app.get("/api/save/:id", function(req, res) {
    console.log(req.body);
    Article.findOne({id: req.body.id}).then(function(article) {
      article.favourite = true;
    })
  })
}
