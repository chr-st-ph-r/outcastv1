var myFlickr = new FlickrStream({
    key: config.keys.flickr,
    url: "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=079c2c636cb442e6bdc19641dcd34538&user_id=137341536@N08&format=json&nojsoncallback=1",
});

var popularFlickr = new FlickrStream({
	key: config.keys.flickr,
	url: "https://api.flickr.com/services/rest/?method=flickr.stats.getPopularPhotos&api_key=079c2c636cb442e6bdc19641dcd34538&user_id=137341536@N08&format=json&nojsoncallback=1",
})

var rPics = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/pics.json?sort=hot"
})

var rEarthPorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/EarthPorn.json?sort=hot"
})

var rCityPorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/cityporn.json?sort=hot"
})

var rMapPorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/mapporn.json?sort=hot"
})

var rSpacePorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/spaceporn.json?sort=hot"
})

var rNewsPorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/NewsPorn.json?sort=hot"
})

var clock = new Clock({
    name: "clock",
    type: "utility",
});

var weather = new Weather({
    name: "weather",
    type: "utility",
});

var test = new Channel({
    name: "test",
});


(function(){
    test.addStream(myFlickr);
    test.addStream(rPics);
    test.addStream(rEarthPorn);
    test.addStream(rCityPorn);
    test.addStream(rMapPorn);
    test.addStream(rNewsPorn);
    test.addFeature(clock);
//    test.addStream(popularFlickr);

    test.load();
    weather.init();
//    weather.check();
    

    var no_clock = true;
    
    var loader = window.setInterval(function() {
        if (test.ready()) {
            
            if (test.isEmpty()) {
                test.fill();
                test.shuffle();
            }
            
            var next = test.get();
            if (next) {
                console.log(typeof next);
                document.body.appendChild(next);
            }
            
            window.setInterval(test.run.bind(test), 30000);
            window.setInterval(tick_tock, 1000);
            
            window.clearInterval(loader);
        }
    }, 100);
    

    var tick_tock = function() {
        if (no_clock) {
            var new_clock = clock.build();
            console.log(new_clock);
            document.querySelector("#feature_bar").appendChild(new_clock);
            no_clock = false;
        }
        clock.update();
    }
    
})();
