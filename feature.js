function Feature(obj) {
    if (this instanceof Feature) {
        this.name = obj ? obj.name : "";
        this.type = obj ? obj.type : "";
        this.loc = obj ? obj.loc : [0, 0];
    } else {
        return new Feature(obj);
    }
}

Feature.prototype.build = function() {
    console.log("building feature");
    var feature_box = document.createElement('div');
    feature_box.className = "feature";
    var feature = this._buildFeature();
    console.log(this + " " + this.loc);

    feature_box.appendChild(feature);
    
    return feature_box;
}

Feature.prototype.update = function(feat) {
    var self = document.querySelector("#" + this.name);
    this._update(self);
}