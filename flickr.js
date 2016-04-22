// flickr.js
// FlickrStreams are special Stream objects that
// come with a few functions helpful for working
// with the data we get from Flickr's api service

function FlickrStream(obj) {
    Stream.call(this, obj);
}

FlickrStream.prototype = Object.create(Stream.prototype);

// [void] handleResponse(response object)
// knows how to handle Flickr api responses by building
// scene objects and self populating the inflow array
FlickrStream.prototype.handleResponse = function(resp) {
    assert(resp, "No response.");
    assert((resp.stat != "fail"), resp.message);
    
    var photos = resp.photos.photo;
    for (var i = 0; i < photos.length; i++) {
        // determine url
        var url = this._buildURL(photos[i]);
        // build the scene with url
        var scene = this.buildScene(url);
        // store the scene
        //console.log(scene);
        if (scene) {
            this.stream.push(scene);    
        }
    }

    this.loaded = true;
}

// [string] _buildURL(response object)
// returns the url format flickr uses to load images
FlickrStream.prototype._buildURL = function(obj) {
    return "https://farm" + obj.farm + ".staticflickr.com/" + obj.server + "/" + obj.id + "_" + obj.secret + "_h.jpg";
}

//// [Image] _buildScene(url string)
//// simply creates and initializes a new image object
//// before returning it
//FlickrStream.prototype._buildScene = function(url) {
//    var img = new Image();
//    img.src = url;
//    img.className = "scene";
//
//    return img;
//}
