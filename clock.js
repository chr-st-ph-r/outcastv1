function Clock(obj) {
    Feature.call(this, obj);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.day = 0;
    this.month = 0;
    this.year = 0
}

Clock.prototype = Object.create(Feature.prototype);

Clock.prototype.tick = function() {
    var data = new Date();
    this.seconds = data.getSeconds();
    this.minutes = data.getMinutes();
    this.hours = data.getHours();
    this.day = data.getDay();
    this.month = data.getMonth();
    this.year = data.getYear();
}

Clock.prototype._buildFeature = function() {
    this.tick();
    var clock_box = document.createElement("div");
    clock_box.setAttribute("id", this.name);
    clock_box.innerText = this.hours + " " + this.minutes;
    return clock_box;
}

Clock.prototype._update = function(clock) {
    this.tick();
    var hours = this.hours;
    var minutes = this.minutes;
    
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    
    if (hours > 12) {
        hours = hours - 12;
    }
    
    clock.innerText = hours + ":" + minutes;
}