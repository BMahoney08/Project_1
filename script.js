var cards = [[0,1],[2,3],[4,5],[6,7]];
var clickCounter = 0;
var answer = $('.answer');
var nextCard = $('.nextCard');
var flashCard = $('.flashCard');

flashCard.html(cards[0][0]);

answer.on("click", function() {
  flashCard.html(cards[clickCounter][1]);
});

nextCard.on("click", function() {
  clickCounter += 1;
  flashCard.html(cards[clickCounter][0]);
});
