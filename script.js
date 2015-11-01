//Global variables
var cards = [];
var allCards = [["CLI","Command Line Interface"],
["popd","pop directory"],
["export","export/set new environment variable"],
["grep","find things inside files"],
["less", "page through a file"],
["find","find files"],
["mkdir","make directory"],
["cat", "print the whole file"],
["pwd", "print working directory"],
["xargs","execute arguments"],
["mv", "move a file or directory"],
["apropos", "find what manual page is appropriate"],
["rmdir", "remove directory"],
["exit","exit the shell"],
["cp", "copy a file or directory"],
["echo","print some arguments"],
["hostname", "my computer's network name"],
["ls", "list directory"],
["man", "read a manual page"],
["pushd", "push a directory"],
["cd", "change directory"],
["sudo", "Danger! become a super user"]
];
var clickCounter = 0;
var answer = $('.answer');
var correctStats = $('.correctStats');
var incorrect = $('.incorrect');
var correct = $('.correct');
var flashCard = $('.flashCard');
var incorrectCards = [];
var correctStats = $(".correctStats");
var incorrectStats = $(".incorrectStats");
var snd = new Audio("Sounds/paper_tearing.wav");
var currentStreak = 0;
var maxStreak = 0;

var maxStreakCheck = function() {
  if(currentStreak > maxStreak) {
    maxStreak = currentStreak;
    $(".maxStreak").text("Max Streak: " + currentStreak)
  }
}

//Sets the deck to the full deck.
cards = allCards;

var correctStatTracker = 0;

//function to track correct answer stats
var correctAnswerTracked = function() {
  correctStatTracker = correctStatTracker + 1;
  correctStats.text("Correct:  " + correctStatTracker);
};

var incorrectStatTracker = 0;

//function to track incorrect stats
var incorrectAnswerTracked = function() {
  incorrectStatTracker = incorrectStatTracker + 1;
  incorrectStats.text("Incorrect:  " + incorrectStatTracker);
};

//Function to randomize the order of the flashcards.
var shuffle = function(array) {
  var m = array.length;
  var t;
  var i;
  i = Math.floor(Math.random() * m--);
  t = array[m];
  array[m] = array[i];
  array[i] = t;
}

//Envoking shuffle card function.
shuffle(cards);

//Function that starts the deck
var startGame = function() {
  clickCounter = 0;
  flashCard.html(cards[0][0]);
}

//Envoking function to start the deck of flashcards.
startGame();

//Checks to see if all the cards have been cycled through.
var checkDeckShuffle = function() {
  if(clickCounter >= cards.length) {
    //Selects which deck to use (Incorrect/All) based on user input.
    var whichDeck = prompt("To cycle through the incorrect cards please enter 'I'. To cycle through the entire deck gain, please enter 'A'.");
    if(whichDeck == "I" || whichDeck == "i") {
      //Verifies there are cards in the incorrect deck. If so, the deck of incorrect cards is shuffled and prepared for the user.
      if(incorrectCards.length > 0) {
        cards = incorrectCards;
        shuffle(cards);
        startGame();
        incorrectCards = [];
      }
      //Alerts the user that there are no incorrect cards.
      else if(incorrectCards.length <= 0) {
        alert("You got them all right! The entire deck will be reshuffled.");
        cards = allCards;
        startGame();
      }
      //Shuffles the entire deck if the user selects all cards as next deck.
    }
    else if(whichDeck == "A" || whichDeck == "a") {
      cards = allCards;
      shuffle(cards);
      startGame();
    }
  }
}


//Function to reveal the back of the flashcard
var revealAnswer = function () {
  snd.play();
  flashCard.css("transform", "rotate(-5deg)");
  flashCard.css("background","url(Images/flashcard.jpg)");
  flashCard.html(cards[clickCounter][1]);
};

//Adding event listener to run the reveal answer function if the user clicks on the reveal answer button.
answer.on("click", revealAnswer);

//Function to be run if the user has gotten the correct answer to the flashcard.
var correctAnswer = function() {
  snd.play();
  flashCard.css("transform", "rotate(5deg)");
  flashCard.css("background","#F8F8F8");
  clickCounter += 1;
  checkDeckShuffle();
  flashCard.html(cards[clickCounter][0]);
  correctAnswerTracked();
  currentStreak += 1;
  $(".currentStreak").text("Current Streak: " + currentStreak);
  maxStreakCheck();
};

//Function to be run if the user has gotten the incorrect answer to the flashcard.
var incorrectAnswer = function() {
  snd.play();
  flashCard.css("transform", "rotate(5deg)");
  flashCard.css("background","#F8F8F8")
  incorrectCards.push(cards[clickCounter]);
  clickCounter += 1;
  checkDeckShuffle();
  flashCard.html(cards[clickCounter][0]);
  incorrectAnswerTracked();
  currentStreak = 0;
  $(".currentStreak").text("Current Streak: " + currentStreak);
}

//Adding event listener to run the correct answer function if the user clicks the correct button.
correct.on("click", correctAnswer);

//Adding event listener to run the correct answer function if the user clicks the incorrect button.
incorrect.on("click", incorrectAnswer);

//Shift functionality to reveal back of the flashcard
$('body').on('keyup', function ( evt ) {
  evt.preventDefault();
  if(evt.keyCode === 16) {
    revealAnswer();
  };
});

//Left arrow functionality for "incorrect" flashcards
$('body').on('keyup', function ( evt ) {
  if(evt.keyCode === 37) {
    incorrectAnswer();
  };
});

//Right arrow functionality for "correct" flashcards
$('body').on("keyup", function ( evt ) {
  if(evt.keyCode === 39) {
  correctAnswer();
  };
});

var statsLog = document.cookie = "correctStats"
