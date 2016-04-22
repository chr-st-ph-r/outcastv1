function Weather(obj) {
    Feature.call(this, obj);
    this.longitude = 0;
    this.latitude = 0;
    this.data = {}; // weather data from wu
    this.located = false;
    this.loaded = false;
    var self = this;
    
    this.init = function() {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
                self.latitude = position.coords.latitude;
                self.longitude = position.coords.longitude;
                self.located = true;
                self.check();
        })
    }
}

Weather.prototype = Object.create(Feature.prototype);

//Weather.prototype.init = function() {
//    if ("geolocation" in navigator) {
//        navigator.geolocation.getCurrentPosition(function(position) {
//            console.log(position);
//            this.latitude = position.coords.latitude;
//            this.longitude = position.coords.longitude;
//            this.located = true;
//        })
//    }
//
//}

Weather.prototype.check = function() {
    if (this.located) {
        var self = this;
        console.log(self.latitude);
        $.ajax({
            url: "http://api.wunderground.com/api/3b00a421fe21ab80/conditions/q/" + self.latitude + "," + self.longitude + ".json",
            dataType: 'jsonp',
        })
        
        .fail(function(xhr, textStatus, errorThrown) {
              console.log(errorThrown);
            })
        
        .success(function(resp) {
//            console.log(resp);
            
            // we'll take the weather info wholesale
            self.data = JSON.parse(JSON.stringify(resp.current_observation));
            console.log(self.data);
            self.loaded = true;
            var bar = U.find("#feature_bar");
            bar.appendChild(self.build());
        })
    }
}

Weather.prototype._buildFeature = function() {
    if (this.loaded) {
        var weather_box = U.make("div");
        U.set(weather_box, "id", this.name);
        
        var temp_f = U.make("div");
        U.set(temp_f, "id", "temp");
        temp_f.innerText = " " + this.data.temp_f + "°";
        U.add(weather_box, temp_f);
        
        var city = U.make("div");
        U.set(city, "id", "city");
        city.innerText = this.data.display_location.city;
        U.add(weather_box, city);
        
        
        
        return weather_box;
//        document.appendChild(weather_box);
        console.log(typeof weather_box);
    } else {console.log("Weather data not found!");}
}