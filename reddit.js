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
            var isGifv = false;

            if (url.substr(url.length-1) === "/") {
                continue;
            }

            for (var j = url.length; j > url.length-5; j--) {
                if (url[j] === "." || url[j] === "/") {
                    has_ext = true;
                }

                if (url[j-1] === ".") {
                    has_ext = true;
                }
            }
//            console.log(url[url.length-4]);
//            console.log(url[url.length-3]);
            if (!has_ext) {
                url += ".jpg";
            }

            if (url[url.length-1] === 'v') {
              console.log(typeof url);
              url = url.slice(0,-4);
              url += "webm";
              isGifv = true;
            }


            //console.log(url);
            var scene = this.buildScene(url, isGifv);
            if (scene) {
                this.stream.push(scene);
            }

        }
    }

    this.loaded = true;
}
