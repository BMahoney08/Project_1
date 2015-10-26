//Global variables
var cards = [];
var allCards = [[0,1],[2,3],[4,5],[6,7]];
var clickCounter = 0;
var answer = $('.answer');
var correct = $('.correct');
var incorrect = $('.incorrect');
var flashCard = $('.flashCard');
var incorrectDeck = $('.incorrectDeck');
var incorrectCards = [];

//Sets the deck to the full deck.
cards = allCards;

//Function to randomize the order of the cards.
var shuffle = function(array) {
  var m = array.length;
  var t;
  var i;
  i = Math.floor(Math.random() * m--);
  t = array[m]
  array[m] = array[i]
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
    if(whichDeck === "I") {
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
    else if(whichDeck === "A") {
      cards = allCards;
      shuffle(cards);
      startGame();
    }
  }
}

//Shows the user the back of the flashcard.
answer.on("click", function() {
  flashCard.html(cards[clickCounter][1]);
});

//User selects if they got the correct answer to the flashcard.
correct.on("click", function() {
  clickCounter += 1;
  checkDeckShuffle();
  flashCard.html(cards[clickCounter][0]);
});

//User selects if they did not get the correct answer to the flashcard.
incorrect.on("click", function() {
  incorrectCards.push(cards[clickCounter]);
  clickCounter += 1;
  checkDeckShuffle();
  flashCard.html(cards[clickCounter][0]);
});
