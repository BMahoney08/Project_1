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

//Sets the deck to the full deck;
cards = allCards;

//Starts at the first flashcard in the deck.
flashCard.html(cards[0][0]);

//Shuffles the deck and starts user from the beginning again.
var shuffleDeck = function() {
  clickCounter = 0;
  flashCard.html(cards[0][0]);
}

//Checks to see if all the cards have been cycled through.
var checkDeckShuffle = function() {
  if(clickCounter >= cards.length) {
    //Selects which deck to use based on user input.
    var whichDeck = prompt("To cycle through the incorrect cards please enter 'I'. To cycle through the entire deck gain, please enter 'A'.");
    if(whichDeck === "I") {
      //Verifies there are more than 0 cards in the incorrect deck.
      if(incorrectCards.length > 0) {
        cards = incorrectCards;
        shuffleDeck();
      }
      else if(incorrectCards.length <= 0) {
        alert("You got them all right! The entire deck will be reshuffled.")
        shuffleDeck();
      }
    }
    else if(whichDeck === "A") {
      cards = allCards;
      shuffleDeck();
    }
  }
}

//Shows the user the back of the flashcard.
answer.on("click", function() {
  flashCard.html(cards[clickCounter][1]);
});

//User selects if they got the answer to the flashcard correct.
correct.on("click", function() {
  clickCounter += 1;
  checkDeckShuffle();
  flashCard.html(cards[clickCounter][0]);
});

//User selects if they got the answer to the flashcard incorrect.
incorrect.on("click", function() {
  incorrectCards.push(cards[clickCounter]);
  clickCounter += 1;
  checkDeckShuffle();
  flashCard.html(cards[clickCounter][0]);
});
