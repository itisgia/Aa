
var Memory = {

	clicks: 0,
	totalClicks: 0,

	boxes: document.getElementsByClassName('box'),

	// Run on page load
	init: function() {
		var boxes = Memory.boxes;
		console.log(boxes);

		for (var i = 0; i < boxes.length; i++) {
			boxes[i].className += ' unflipped incorrect';

			boxes[i].addEventListener('click', function(){
				Memory.clickFunction(this);
			}, false);
		};
		Memory.shuffle();
	},

	clickFunction: function(element) {

		if(Memory.clicks < 2 && hasClass(element, 'active') == false) {

			// Get old
			var oldBox = document.querySelectorAll('.box.active.incorrect');

			element.className = element.className.replace('unflipped', 'active');

			if(oldBox.length > 0) {
				oldBox = oldBox[0];
				if (oldBox.className == element.className) {

					// Set classes
					oldBox = Memory.setCorrectClass(oldBox);
					element = Memory.setCorrectClass(element);

				}
			}

			Memory.clicks ++;
			Memory.totalClicks ++;
			console.log(Memory.totalClicks);

		}

		if(Memory.clicks >= 2) {

			setTimeout("Memory.hideIncorrectBoxes()", 500);
		}
	},
	// Replace incorrect with the correct class
	setCorrectClass: function(element) {

		return element.className = element.className.replace('incorrect', 'correct');
	},


	hideIncorrectBoxes: function() {

		var clickedBoxes = document.querySelectorAll('.box.active.incorrect');

		for (var i = 0; i < clickedBoxes.length; i++) {
			clickedBoxes[i].className = clickedBoxes[i].className.replace('active', 'unflipped');
		}

		// Reset clicks
		Memory.clicks = 0;
	},
	shuffle: function() {
		var clonedBoxes = [];

		for (var i = Memory.boxes.length - 1; i >= 0; i--) {
			clonedBoxes.push(Memory.boxes[i]);
		}

		// console.log(clonedBoxes);

		var memoryWrapper = document.getElementById('memoryWrapper');
		console.log(memoryWrapper);

		var shuffledBoxes = Memory.suffleCards(clonedBoxes);

		for (var i = shuffledBoxes.length - 1; i >= 0; i--) {
			memoryWrapper.appendChild(shuffledBoxes[i]);
		}

		Memory.boxes = [];

		Memory.boxes = shuffledBoxes;
	},
	suffleCards: function (array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex --;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

};

window.onload = Memory.init;


// Check if element has class
// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, className) {
    return ((' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1);
};
