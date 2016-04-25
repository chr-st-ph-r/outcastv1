function News(obj) {
    Feature.call(this, obj);
    this.articles = [];
    this.loc = 0;
    this.url = 'https://content.guardianapis.com/search?production-office=us&show-fields=trail-text&page-size=50&api-key=';
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
    var bar = U.find("#feature_bar");
    bar.appendChild(self.build());
  });
}

News.prototype._buildFeature = function () {
  var ticker = U.make("div");
  U.set(ticker, "id", this.name);

  this.articles.forEach(function(article) {
    var head = U.make("span");
    head.classList.add("headline");
    head.innerText = article.webTitle + " ";

    var trail = U.make("span");
    trail.classList.add("trail_text");

    trail.innerText = article.fields.trailText + " // ";

    U.add(ticker, head);
    U.add(ticker, trail);

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
