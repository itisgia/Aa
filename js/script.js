
var Memory = {

	clicks: 0,

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
		}
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
	}

};

window.onload = Memory.init;


// Check if element has class
// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, className) {
    return ((' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1);
};
