var wins = 0;
var losses = 0;

var strikes = 0;
var maxStrikes = 9;

var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var strikeCountElement = document.getElementById("strike-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");

var visibleLetters = [];
var guessedLetters = [];

//var newGame = true;
var gameOver = false;
var resultLine = "                  ";
var hintText = "    ";

var blinkElements = document.getElementsByClassName("blinking");
//var resultLineElements = document.getElementsByClassName("result-line");
var resultLineElement = document.getElementById("result-line");
var hintElement = document.getElementById("hint");

var validGuesses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 

'y', 'z'];

var wordList = [
	"deathstar",
	"xwing",
	"skywalker",
	"yavin",
	"darthvader",
	"hansolo",
	"tiefighter",
	"tatooine"
];

var hints = [
	"  Hint: ...that's no moon.  ",
	"  Hint: a type of spaceship ",
	"       Hint: a person       ",
	"       Hint: a planet       ",
	"       Hint: a person       ",
	"       Hint: a person       ",
	"  Hint: a type of spaceship ",
	"       Hint: a planet       "
]

var theWord = "";

// this function resets the screen to the default which is the start of the game.

function initializeScreen() {
	console.log("--- initializeScreen ---");
	guessedLetters = [];
	visibleLetters = [];
	strikes = 0;
	gameOver = false;
	resultLine = "                    ";
	theWord = "";
	hintText = "";

	//get word from the wordList array above
	theWord = wordList[Math.floor(Math.random() * wordList.length)];
	
	console.log("the word is: " + theWord);

	// get the hint associated with the word: get the index
	var theIndex = wordList.indexOf(theWord);
	// now get the value
	hintText = hints[theIndex];


	// set the array visibleLetters to contain all false values for each element in the array
	for (var i = 0; i < theWord.length; i++) {
		visibleLetters[i] = false;
	}
	// loop through the word to build the underscores for the screen.
	// store the underscores in the tempString variable.
	// also set the word to be all upper case
	var tempString = "";
	for (var i = 0; i < visibleLetters.length; i++) {
		// if visibleLetters[i] = false, then visibleLetters[i] = "_"
		// else visibleLetters[i] = the uppercase letter of the word
		tempString += ((visibleLetters[i]) ? theWord.charAt(i).toUpperCase() : "_");
		if (i < (visibleLetters.length - 1)) {
			tempString += " "; // this simply adds a space in the letters to make it look cool
		}
	}
	wordDisplayLettersElement.textContent = tempString;

	// display the hint
	hint.textContent = hintText;

	console.log("tempstring = " + tempString);


} // END function to initialize the screen

function updateScreen() {
	console.log("--- updateScreen ---");

	// update the visible letters
	// if visibleLetters[i] is true, then display the letter of the word at that position
	// else display an underscore

	var tempString = ""
	for (var i = 0; i < visibleLetters.length; i++) {

		console.log("VS = " + visibleLetters[i]);

		tempString += ((visibleLetters[i]) ? theWord.charAt(i).toUpperCase() : "_" );
		if (i < (visibleLetters.length - 1)) tempString += " ";
	}
	wordDisplayLettersElement.textContent = tempString;

	console.log("word display letters - tempString = " + tempString);

	// update the screen to show the guessed letters

	tempString = "";
	for (var i = 0; i < guessedLetters.length; i++) {
		tempString += (guessedLetters[i].toUpperCase());
		if (i < (guessedLetters.length - 1)) tempString += " ";
	}

	// We have the data, but now need to add some padding

	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guessedLettersElement.textContent = tempString;


	// display the number of strikes and max strikes

	tempString = strikes + " / " + maxStrikes;

	// add some padding to the string

	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	strikeCountElement.textContent = tempString;

	// display the wins and add a little padding

	tempString = wins + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winCountElement.textContent = tempString;

	// Display the losses and add padding

	tempString = losses + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
	lossCountElement.textContent = tempString;

	if (!gameOver) {
		instruction.textContent = "Select a-z to guess the word";
	} else {
		instruction.textContent = "    Hit any key to start    ";
	}

	//for (var i = 0; i < blinkElements.length; i++) {
	//	blinkElements[i].textContent = (this.gameOver ? pressAnyKeyToReset[i] : pressAnyKeyToStart[i]);
	//}

	//for (var i = 0; i < resultLineElements.length; i++) {
	//	resultLineElements[i].textContent = (resultLines[i]);
	//}

console.log("resultLine: " + resultLine);

	resultLineElement.textContent = resultLine;
}


function checkGuess(theLetter) {
	console.log("--- checkGuess ---");
	//add the letter to the list of guessed letters 
	guessedLetters.push(theLetter);

	console.log("user entered a valid letter!");

	// check to see if the letter in the word
	var foundIt = false;
	// loop through the word 
	for (var i = 0; i < theWord.length; i++) {
		// check each character in theWord
		if (theWord.charAt(i) == theLetter) {
			foundIt = true;
			console.log("we have a match: " + theLetter);
			// we found a letter and so mark that position as true in the visibleLetters array
			visibleLetters[i] = true;
		}
	}
	// If the letter is not found then add another strike
	if (!foundIt) {
		strikes++;
	}
	// If there are too many strikes, then the user loses and the game is over
	if (strikes >= maxStrikes) {
		gameOver = true;
		losses++;
		resultLine = "      You Lose!     ";
	}
	// Check to see if all the letters have been found.
	// if visibleLetters has no false values in it, it means that you win!
	if (!visibleLetters.includes(false)) {
		wins++;
		resultLine = "      You Win!      ";
		gameOver = true;
	}
	// we could call the function to update the screen here or back in the main function
	updateScreen();
}

// START

// get input from the user and loop until the game is over

document.onkeyup = function (event) {
	var userGuess = event.key;
	console.log("--- user pressed: " + userGuess);
	if (!gameOver) {
		console.log("Game is not over.");
		if (validGuesses.includes(userGuess) && !guessedLetters.includes(userGuess)) {
			checkGuess(userGuess);
			//updateScreen(userGuess);
		}
	} else {
		console.log("Game is over/new game.");
		initializeScreen();
		updateScreen();
	}
}




initializeScreen();
updateScreen();
