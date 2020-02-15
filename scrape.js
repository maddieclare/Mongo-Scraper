const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function scrape(category, page) {
  let queryUrl = `https://www.betootaadvocate.com/category/${category}/page/${page}`;
  let results = [];
  return axios.get(queryUrl).then(function(response) {
    let $ = cheerio.load(response.data);

    $("div.td_module_12").each(function(i, element) {
      let title = $(element)
        .find(".entry-title a")
        .text();
      let image = $(element)
        .find(".entry-thumb")
        .attr("src");
      let preview = $(element)
        .find(".td-excerpt")
        .text();
      let link = $(element)
        .find(".entry-title a")
        .attr("href");
      let date = $(element)
        .find(".sc-3nbvzd-0")
        .children("div")
        .first()
        .text();

      if (title !== "") {
        results.push({
          title: title,
          image: image,
          preview: preview,
          link: link,
          date: date
        });
      }
    });
    return results;
  });
};
