module.exports = {
  scrape: function(category) {
    let queryUrl = `https://${category}.theonion.com/`;
    let results = [];
    return axios.get(queryUrl).then(function(response) {
      let $ = cheerio.load(response.data);

      let listItems = $("div.sc-17uq8ex-0 article").each(function(i, element) {
        let title = $(element)
          .find(".cw4lnv-5 a h2")
          .text();
        let category = $(element)
          .find(".cw4lnv-12 a span")
          .first()
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
    });
  }
};
