var myFlickr = new FlickrStream({
    key: '079c2c636cb442e6bdc19641dcd34538',
    url: "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=079c2c636cb442e6bdc19641dcd34538&user_id=137341536@N08&format=json&nojsoncallback=1",
});

var popularFlickr = new FlickrStream({
	key: '079c2c636cb442e6bdc19641dcd34538',
	url: "https://api.flickr.com/services/rest/?method=flickr.stats.getPopularPhotos&api_key=079c2c636cb442e6bdc19641dcd34538&user_id=137341536@N08&format=json&nojsoncallback=1",
})

var rPics = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/pics.json?sort=top&t=all"
})

var rEarthPorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/EarthPorn.json?sort=top&t=all"
})

var rCityPorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/cityporn.json?sort=top&t=all"
})

var rMapPorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/mapporn.json?sort=top&t=all"
})

var rSpacePorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/spaceporn.json?sort=top&t=all"
})

var rSFWPorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/earthporn+waterporn+skyporn+spaceporn+fireporn+destructionporn+geologyporn+winterporn+autumnporn+cityporn+villageporn+abandonedporn+infrastructureporn+machineporn+militaryporn+cemeteryporn+architectureporn+carporn+gunporn+boatporn+aerialporn+F1porn+ruralporn+animalporn+botanicalporn+humanporn+adrenalineporn+climbingporn+culinaryporn+foodporn+dessertporn+agricultureporn+designporn+albumartporn+movieposterporn+adporn+geekporn+instrumentporn+macroporn+artporn+fractalporn+exposureporn+microporn+metalporn+streetartporn+historyporn+mapporn+bookporn+newsporn+quotesporn+futureporn.json?sort=top&t=month"
})

var rWallpaperTop = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/wallpaper/top/.json?sort=top&t=all"
})

var rUltrahdwallpapers = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/ultrahdwallpapers/top/.json?sort=top&t=all"
})

var rNewsPorn = new RedditStream({
    key: "",
    url: "https://www.reddit.com/r/NewsPorn/.json"
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
    test.addStream(rSFWPorn);
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

//function foo() {
//    var obj = {
//        url: "https://accounts.google.com/o/oauth2/v2/auth?scope=drive&response_type=token&76283283358-laaejfc823ovmcthao3kh6eane3cdq33.apps.googleusercontent.com&nonce=iauhfiahfitat862",
//        scope: "https://www.googleapis.com/auth/drive.photos.readonly",
//        api: "drive",
//        v: "v2",
//        key: "AIzaSyBA46X6-H_HNTZ8jfj-jyk8lN_tIOytpgw",
//        clientID: "76283283358-laaejfc823ovmcthao3kh6eane3cdq33.apps.googleusercontent.com"
//    };
//
//    test.streams[0] = new GoogleStream( obj );
//    console.log("running");
//    test.streams[0].callApi();   
//}
//
//function bar() {
//    for (var i = 0; i < test.streams[0].inflow.length; i++) {
//        var item = test.streams[0].inflow[i];
//        var mime = item.mimeType.split("/")[0];
//        if (mime == "image") {
//            var $image = $('<img>');
//            var url = item.webContentLink.split("&")[0];
//            $image.attr('src', url);
//            test.images.push($image);
//            $('body').append(test.images[0] );
////            console.log($image);
////            loadImage(item.webContentLink, function(img) {
////                document.body.append(img);
////            },
////            {
////                canvas: true,
////                crossOrigin: true,
////                cover: true
////            })
//        }
//        
//    }
//    console.log(test.images);
//}
//    
//
//document.onclick = function() {
//    $('#load').click(foo);
//    $('#show').click(bar);
//    console.log("running");
//}
