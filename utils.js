function assert(condition, message) {
	if (!condition) {
		throw message || "Assert failed";
	}
}

function shuffle(array) {
    // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    var counter = array.length;
    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);

        counter--;

        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }  
}

function find(string) {
    return document.querySelector(string);
}

function make(elem) {
    var e = document.createElement(elem);
    return e;
}

var U = {  
    
    assert: function(condition, message) {
        if (!condition) {
            throw message || "Assertion failed";
        }
    },
    
    shuffle: function(array) {
        // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
        var counter = array.length;
        
        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);

            counter--;

            var temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
    },
    
    find: function(string) {
        return document.querySelector(string);
    },
    
    make: function(elem) {
        var e = document.createElement(elem);
        return e;
    },
    
    set: function(elem, attr, val) {
        elem.setAttribute(attr, val);
        return this;
    },
    
    add: function(father, child) {
        father.appendChild(child);
    }
    
    
}