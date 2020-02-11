const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function scrape(category) {
  let queryUrl = `https://www.betootaadvocate.com/category/${category}/`;
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
        console.log(image);
      let link = $(element)
      .find(".entry-title a")
      .attr("href");
      console.log(link);
      let date = $(element)
        .find(".sc-3nbvzd-0")
        .children("div")
        .first()
        .text();

      if (title !== "") {
        results.push({
          title: title,
          image: image,
          link: link,
          date: date
        });
      }
    });
    return results;
  });
};
