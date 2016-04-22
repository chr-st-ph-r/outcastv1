// reddit.js

function RedditStream(obj) {
    Stream.call(this, obj);
}

RedditStream.prototype = Object.create(Stream.prototype);

RedditStream.prototype.handleResponse = function(resp) {
    assert(resp, "No response.");
    var photoData = resp.data.children;
    for (var i = 0; i < photoData.length; i++) {
        if (this.DOMAINS[photoData[i].data.domain]) {
            var url = photoData[i].data.url;
            var has_ext = false;
            for (var j = url.length; j > url.length-5; j--) {
                if (url[j] === "." || url[j] === "/") {
                    has_ext = true;
                }
            }
//            console.log(url[url.length-4]);
//            console.log(url[url.length-3]);
            if (!has_ext) {
                url += ".jpg";
            }
            //console.log(url);
            var scene = this.buildScene(url);
            if (scene) {
                this.stream.push(scene);    
            }
  
        }
    }
    
    this.loaded = true;
}