document.getElementById('playerCard1').style.display = 'none';
document.getElementById('playerCard2').style.display = 'none';
document.getElementById('facedownCard').style.display = 'none';
document.getElementById('dealerCard').style.display = 'none';
var card1 = Math.ceil(Math.random()*13);
var card2 = Math.ceil(Math.random()*13);
var dCard1 = Math.ceil(Math.random()*13);
var suit1 = Math.ceil(Math.random()*4);
var suit2 = Math.ceil(Math.random()*4);
var dSuit1 = Math.ceil(Math.random()*4);
var newCard = Math.ceil(Math.random()*13);
var newSuit = Math.ceil(Math.random()*4);
var roundScore = [];
var dealerScore = [];
if (card1 > 10 && card2 <= 10) {
	var card1IsFace = 10;
	roundScore = card1IsFace + card2;
} else if (card2 > 10 && card1 <= 10) {
	var card2IsFace = 10;
	roundScore = card1 + card2IsFace;
} else if (card1 > 10 && card2 > 10) {
	var card1IsFace = 10;
	var card2IsFace = 10;
	roundScore = card1IsFace + card2IsFace;
} else {
	roundScore = card1 + card2;
}

console.log(roundScore); 
document.querySelector('.btn-deal').addEventListener('click', function() {
	
	var playerCard1Dom = document.getElementById('playerCard1');
	var playerCard2Dom = document.getElementById('playerCard2');
	var fdCardDom = document.getElementById('facedownCard');
	var dealerCardDom = document.getElementById('dealerCard');
	
	//make sure same cards are not dealt
	if(suit1 === suit2 && card1 === card2) {
		suit2 = Math.ceil(Math.random()*4);
		return;
		
	} else {
		playerCard1Dom.style.display = 'block';
		playerCard2Dom.style.display = 'block';
		fdCardDom.style.display = 'block';
		dealerCardDom.style.display = 'block';
		playerCard1Dom.src = 'img/' + card1 + '_of_' + suit1 + '.png';
		playerCard2Dom.src = 'img/' + card2 + '_of_' + suit2 + '.png';
		dealerCardDom.src = 'img/' + dCard1 + '_of_' + dSuit1 + '.png';
	}
});

document.querySelector('.btn-hit').addEventListener('click', function() {
	
	var newCard = Math.ceil(Math.random()*13);
	var newSuit = Math.ceil(Math.random()*4);

	var dealtCard = document.createElement('img');
	dealtCard.setAttribute('src', 'img/' + newCard + '_of_' + newSuit + '.png');
	document.querySelector('.player').appendChild(dealtCard);
	//IF the cards add up to more than 21, than Bust.
	if (newCard > 10) {
		var faceCards = 10;
		roundScore += faceCards;
	} else {
		roundScore += newCard;
	}
	console.log(roundScore);
	if(roundScore > 21) {
		alert('Bust');
	} else if (roundScore === 21) {
		alert('21!');
	}
});

document.querySelector('.btn-stay').addEventListener('click', function() {

	var dCard2 = Math.ceil(Math.random()*13);
	var dSuit2 = Math.ceil(Math.random()*4);

	var fdCardDom = document.getElementById('facedownCard');

	fdCardDom.src = 'img/' + dCard2 + '_of_' + dSuit2 + '.png';

	//IF dealer has less than or equal to 16, he will deal one more card
	if (dCard1 > 10 && dCard2 <= 10) {
		var dCard1IsFace = 10;
		dealerScore = dCard1IsFace + dCard2;
	} else if (dCard2 > 10 && dCard1 <= 10) {
		var dCard2IsFace = 10;
		dealerScore = dCard1 + dCard2IsFace;
	} else if (dCard1 > 10 && dCard2 > 10) {
		var dCard1IsFace = 10;
		var dCard2IsFace = 10;
		dealerScore = dCard1IsFace + dCard2IsFace;
	} else {
		dealerScore = dCard1 + dCard2;
	}
	while (dealerScore <= 16) {
		var newDCard = Math.ceil(Math.random()*13);
		var newDSuit = Math.ceil(Math.random()*4);
		var dealtDCard = document.createElement('img');
		dealtDCard.setAttribute('src', 'img/' + newDCard + '_of_' + newDSuit + '.png');

		document.querySelector('.dealer').appendChild(dealtDCard);
		dealerScore += newDCard;
	};
	if (roundScore > dealerScore) {
		console.log('You win!')
	} else if (roundScore < dealerScore) {
		console.log('You lose..')
	} else {
		console.log('it\'s a draw')
	}

})
