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