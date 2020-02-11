$(document).ready(function() {
  let $resultsSection = $("#results-section");
  let $cardDiv = $("#article-card");

  const searchAPI = {
    showAll: function() {
      return $.ajax({
        url: "/all",
        type: "GET"
      });
    }
  };

  let getArticles = function() {
    searchAPI.showAll().then(function(results) {
      results.forEach(article => {
        let $articleCard = $cardDiv.clone().removeAttr("style");
        let $articleTitle = $articleCard.find("#article-title");
        let $articleCategory = $articleCard.find("#article-category");
        let $articleTime = $articleCard.find("#article-time");
        let $articleLink = $articleCard.find("#article-link");

        $articleTitle.html(article.title);
        $articleCategory.html(article.category);
        $articleTime.html(article.time);
        $articleLink.attr("href", article.link);
        $resultsSection.append($articleCard);
      });
    });
  };

  getArticles();
});

var handleScrapeSubmit = function(event) {
  event.preventDefault();

  var category = $scrapeByCategory.val().trim();

  searchAPI.scrapeByCategory(category).then(function(response) {
    var data = prepareResponseForTable(response);
    makeTable($tableDiv, data);
  });

  // Clear out scrape field
  $scrapeByCategory.val("");
};
