// stream.js
// Streams are designed to play fetch and release with
// third party apis. Streams are built on top of simple
// js arrays. Once an item is released from a Stream,
// it's gone for good.

function Stream(obj) {
    if (this instanceof Stream) {
        this.url = obj.url || "";
        this.key = obj.key || "";
        this.clientID = obj.clientID || "";
        this.type = obj.type || "";
        this.stream = [];
        this.loaded = false;
        this.DOMAINS = {
            //"imgur.com" : true,
            "i.imgur.com" : true,
            "c2.staticflickr.com" : true,
            "c1.staticflickr.com" : true,
            "farm1.staticflickr.com" : true,
            "farm2.staticflickr.com" : true,
            "upload.wikimedia.org" : true,
            "nasa.gov" : true,
            "apod.nasa.gov" : true,
            "spaceweathergallery.com" : true,
            "cdn.spacetelescope.org" : true,
        }
    } else {
        return new Stream(obj);
    }
}

// [void] fill()
// retrieves data from the Stream's api service
Stream.prototype.fill = function() {
    var url = this.url;
    // FIXME: this is probably cheating, and we can do better
    var self = this;
    $.ajax({
        url: url,
        dataType: 'json',
        jsonp: 'callback'
    })

    .fail(function(xhr, textStatus, errorThrown) {
        console.log(errorThrown);
    })

    .success(function(resp) {
        // success just means the ajax request
        // returned anything at all.
        self.handleResponse(resp);
    });
}

// [Image] release()
// returns the first Image in the inflow array
Stream.prototype.release = function() {
    var img = this.stream.shift();
    //console.log(img);
    return img;
}

Stream.prototype.buildScene = function(url, gifv) {
  if (gifv) {
    var gifv = U.make("video");
    gifv.classList.add("scene");
    U.set(gifv, "preload", "auto");
    U.set(gifv, "autoplay", "autoplay");
    U.set(gifv, "loop", "loop");
    var src = U.make("source");
    U.set(src, "src", url);
    gifv.appendChild(src);
    return gifv;
  }

  var img = new Image();
  img.onload = function() {
      this.valid = true;
  }
  img.onerror = function() {
      this.valid = false;
  }
  img.src = url;
  img.className = "scene";
  return img;
}
