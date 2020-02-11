$(document).ready(function() {
let $favouritesButton = $("#favourites-button");

  let $resultsSection = $("#results-section");
  let $cardDiv = $("#article-card");

  let $addFavourite = $("#add-favourite");
  let $addComment = $("#add-comment");
  let $viewComments = $("#viwe-comments");


  const searchAPI = {
    showAll: function() {
      return $.ajax({
        url: "/api/all",
        type: "GET"
      });
    },

    addToFavourites: function() {
      return $.ajax({
        url: "/api/save",
        type: "POST"
      });
    },

    showFavourites: function() {
      return $.ajax({
        url: "/api/favourites",
        type: "GET"
      });
    }
  };

  let getArticles = function() {
    searchAPI.showAll().then(function(results) {
      results.forEach(article => {
        let $articleCard = $cardDiv.clone().removeAttr("style");
        let $articleTitle = $articleCard.find("#article-title");
        let $articleImage = $articleCard.find("#article-image");
        let $articlePreview = $articleCard.find("#article-preview");
        let $articleDate = $articleCard.find("#article-date");
        let $articleLink = $articleCard.find("#article-link");

        $articleTitle.html(article.title);
        $articleImage.attr("src", article.image);
        $articlePreview.html(article.preview);
        $articleDate.html(article.date);
        $articleLink.attr("href", article.link);
        $resultsSection.append($articleCard);
      });
    });
  };

  getArticles();

  //   EVENT LISTENERS
  $favouritesButton.on("click", function(event) {
    event.preventDefault();
    searchAPI.showFavourites();
  });

  $addFavourite.on("click", function(event) {
    event.preventDefault();
    searchAPI.addToFavourites();
  });
});
