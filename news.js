function News(obj) {
    Feature.call(this, obj);
    this.articles = [];
    this.url = 'https://content.guardianapis.com/search?show-fields=trail-text&api-key';
}

News.prototype = Object.create(Feature.prototype);

News.prototype.init = function() {
    
    fetch(this.url + config.keys.guardian)
    .then(function(resp) {
        console.log(resp);
    });
}