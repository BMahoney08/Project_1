var cards = [1,2,3,4,5,6,7,8];

var flashCards = $(".flashCards");

var click = 0;

flashCards.on("click", function(evt) {
  console.log(click);
  for(var i = 0; i < cards.length; i++){
    flashCards.html(cards[click]);
  }
  click += 1;


})
