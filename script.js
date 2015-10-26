var cards = [[0,1],[2,3],[4,5],[6,7]];
var clickCounter = 0;
var answer = $('.answer');
var correct = $('.correct');
var incorrect = $('.incorrect');
var flashCard = $('.flashCard');
var shuffle = $('.shuffle');
var incorrectDeck = $('.incorrectDeck');
var incorrectCards = [];

flashCard.html(cards[0][0]);

var shuffleDeck = function() {
  clickCounter = 0;
  flashCard.html(cards[0][0]);
}

var checkDeckShuffle = function() {
  if(clickCounter >= cards.length) {
    var whichDeck = prompt("To cycle through the incorrect cards please enter 'I'. To cycled through the entire deck gain, please enter 'A'.");
    if(whichDeck === "I") {
      cards = incorrectCards;
      shuffleDeck();
    }
    else if(whichDeck === "A") {
      shuffleDeck();
    }
  }
}

answer.on("click", function() {
  flashCard.html(cards[clickCounter][1]);
});

correct.on("click", function() {
  clickCounter += 1;
  console.log(clickCounter);
  checkDeckShuffle();
  flashCard.html(cards[clickCounter][0]);
});

incorrect.on("click", function() {
  incorrectCards.push(cards[clickCounter]);
  clickCounter += 1;
  checkDeckShuffle();
  flashCard.html(cards[clickCounter][0]);
});

shuffle.on("click", shuffleDeck);
