function Channel(obj) {
    if (this instanceof Channel) {
        this.name = obj.name || "";
        this.streams = [];
        this.features = [];
        this.pipeline = [];
        this.loadedURLs = []; // hash table
        this.loc = 0;
    } else {
        return new Channel(obj);
    }
}

Channel.prototype.addStream = function(stream) {
    this.streams.push(stream);
}

Channel.prototype.addFeature = function(feature) {
    this.features.push(feature);
}

Channel.prototype.getLoc = function() {

}

Channel.prototype.load = function() {
    console.log("loading");
    for (var i = 0; i < this.streams.length; i++) {
        this.streams[i].fill();
    }
}

Channel.prototype.initFeatures = function() {
    for (var i = 0; i < this.features.length; i++) {
            var feature = this.features[i].build();
            console.log("loading feature: " + feature );
            document.body.appendChild(feature);
        }
}

Channel.prototype.updateFeature = function(feature) {
    feature.update();
}

Channel.prototype.fill = function() {
    console.log("fill");
    for (var i = 0; i < this.streams.length; i++) {
        var stream = this.streams[i];
        //console.log(stream);

        while (stream.stream.length > 0) {
            
            var img = stream.release();
            //console.log(img);
            if (!this.loadedURLs[img.src] == 1) {
                this.pipeline.push(img);
                this.loadedURLs[img.src] = 1;
            }
            
//            if (stream.stream.length === 0) {
//                stream.loaded = false;
//            }
        }
    }
}

Channel.prototype.shuffle = function() {
    shuffle(this.pipeline);
}

Channel.prototype.release = function() {
    for (var i = 0; i < this.pipeline.length; i++) {
        document.body.appendChild(this.pipeline[this.loc]);
    }
}

Channel.prototype.next = function() {
    console.log("next");
    if (this.loc === 0) {
        this.shuffle();
    }
    
    this.loc++;

    if (this.loc >= this.pipeline.length) {
        this.loc = 0;
    }   
    
    console.log("current pos: " + this.loc);
    //console.log(this.pipeline);

//    // if there's a scene, remove it
//    //    $unscene = $(".scene");
//    //    $unscene.addClass(".unscene");
//    //
//
//    //    $("body").removeClass(".unscene");
//    var scene = document.querySelector(".scene");
//    if (scene) {
//        scene.classList.add('unscene');
//        var image = this.pipeline[this.loc];
//        console.log(this.loc);
//        document.body.appendChild(image);
//    } else {
//        var image = this.pipeline[this.loc];
//         console.log(image);
//        document.body.appendChild(image);
//    }
//    //_q(".scene").classList.add('unscene');
//    
//    //document.body.appendChild(this.pipeline[this.loc]);
//   // console.log(this.pipeline[this.loc]);
//   console.log(scene);
    // console.log("length: " + this.pipeline.length);

}

Channel.prototype.get = function() {
    //console.log(this.loc);
    return this.pipeline[this.loc];
}

Channel.prototype.ready = function() {
    for (var i = 0; i < this.streams.length; i++) {
//        console.log(this.streams[i].url);
//        console.log(this.streams[i].loaded);
        if (this.streams[i].loaded === false) {
            return false;
        }
    }
    
    return true;
}

Channel.prototype.filter = function() {
    var removals = 0;
    for (var i = 0; i < this.pipeline.length; i++) {
        //console.log(this.pipeline[i]);
        var url = this.pipeline[i].src;
        //console.log(url);
        if (this.pipeline[i].width < 1080) {
            console.log(this.pipeline[i].src);
            console.log(i);
            this.pipeline.splice(i, 1);
            removals++;
        }
        
        if (this.pipeline[i].width < 1.5 * this.pipeline[i].height) {
            console.log(this.pipeline[i].src);
            console.log(i);
            this.pipeline.splice(i, 1);
            removals++;
        }
        
        if (url.substr(url.length-1) === "/") {
            console.log(this.pipeline[i].src);
            this.pipeline.splice(i, 1);
            removals++;
        }
    }
    console.log(this.pipeline);
    console.log("removed " + removals);
    
}

Channel.prototype.isEmpty = function() {
    if (this.pipeline.length <= 0) {
        return true;
    } else {
        return false;
    }
}

Channel.prototype.run = function() {
    this.filter();
    
    if (this.ready()) {
        this.next();
        document.body.appendChild(this.get());
        
        var scenes = document.querySelectorAll(".scene");
        
        if (scenes.length > 2) {
            scenes[0].parentElement.removeChild(scenes[0]);
        }
    }
}