function News(obj) {
    Feature.call(this, obj);
    this.articles = [];
    this.loc = 0;
    this.url = 'https://content.guardianapis.com/search?show-fields=trail-text&page-size=50&api-key=';
}

News.prototype = Object.create(Feature.prototype);

News.prototype.init = function() {
  var self = this;

  fetch(this.url + config.keys.guardian)
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    self.articles = data.response.results;
    console.log(self.articles);
    document.body.appendChild(self.build());
  });
}

News.prototype._buildFeature = function () {
  var ticker = U.make("div");
  U.set(ticker, "id", this.name);

  this.articles.forEach(function(article) {
    ticker.innerText += article.webTitle;
    // var story = U.make("div");
    //
    // var headline = U.make("div");
    // headline.classList.add('headline');
    //
    //
    // var trail_text = U.make("div");
    // trail_text.classList.add('trail_text');
    //
    // headline.innerText = article.webTitle;
    // trail_text.innerText = article.fields.trailText;

    // U.add(story, headline);
    // U.add(story, trail_text);
    // U.add(ticker, story);

  });

  return ticker;
};

News.prototype.next = function () {
  this.loc++;

  if (this.loc >= this.pipeline.length) {
      this.loc = 0;
  }
};
