const scrape = require("../scrape");
const Article = require("./../models/articles");

module.exports = function(app) {
  app.get("/api/all", function(req, res) {
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
  
  app.post("/api/favourites", function(req, res) {
    console.log(req);
  })
}
