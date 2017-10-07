document.getElementById('playerCard1').style.display = 'none';
document.getElementById('playerCard2').style.display = 'none';
document.getElementById('facedownCard').style.display = 'none';
document.getElementById('dealerCard').style.display = 'none';
document.querySelector('.btn-hit').style.display = 'none';
document.querySelector('.btn-stay').style.display = 'none';
document.querySelector('.btn-again').style.display = 'none';

var card1, card2, dCard1, dCard2, suit1, suit2, dSuit1, dSuit2, roundScore, dealerScore, newCard, newSuit, dealtCard, newDCard, newDSuit;

// init();

document.querySelector('.btn-deal').addEventListener('click', function() {
	
	init();
	console.log(roundScore);

	var playerCard1Dom = document.getElementById('playerCard1');
	var playerCard2Dom = document.getElementById('playerCard2');
	var fdCardDom = document.getElementById('facedownCard');
	var dealerCardDom = document.getElementById('dealerCard');

	document.querySelector('.btn-deal').style.display = 'none';
	document.querySelector('.btn-hit').style.display = 'inline-block';
	document.querySelector('.btn-stay').style.display = 'inline-block';

	playerCard1Dom.style.display = 'inline-block';
	playerCard2Dom.style.display = 'inline-block';
	fdCardDom.style.display = 'inline-block';
	dealerCardDom.style.display = 'inline-block';
	playerCard1Dom.src = 'img/' + card1 + '_of_' + suit1 + '.png';
	playerCard2Dom.src = 'img/' + card2 + '_of_' + suit2 + '.png';
	dealerCardDom.src = 'img/' + dCard1 + '_of_' + dSuit1 + '.png';

	if (roundScore === 21) {
		var blackJackH1 = document.createElement('h1');
		var textHere = document.createTextNode('Blackjack!');
		blackJackH1.appendChild(textHere);
		var addHere = document.getElementById('body');
		addHere.appendChild(blackJackH1)
		again();
	}
});

document.querySelector('.btn-hit').addEventListener('click', function() {
	
	newCard = Math.ceil(Math.random()*13);
	newSuit = Math.ceil(Math.random()*4);

	if (newCard === card1 && newSuit === suit1){
		newCard = Math.ceil(Math.random()*13);
		newSuit = Math.ceil(Math.random()*4);
	}

	if (newCard === card2 && newSuit === suit2){
		newCard = Math.ceil(Math.random()*13);
		newSuit = Math.ceil(Math.random()*4);
	}
	if (newCard === dCard1 && newSuit === dSuit1) {
		newCard = Math.ceil(Math.random()*13);
		newSuit = Math.ceil(Math.random()*4);
	}

	dealtCard = document.createElement('img');
	dealtCard.setAttribute('src', 'img/' + newCard + '_of_' + newSuit + '.png');
	dealtCard.className = 'dealt animated bounceInLeft';
	document.querySelector('.player').appendChild(dealtCard);

	//IF the cards add up to more than 21, than Bust.
	if (newCard > 10) {
		var faceCards = 10;
		roundScore += faceCards;
	} else if (newCard === 1 && roundScore < 10) {
		var newCardIsAce = 11;
		roundScore = roundScore + newCardIsAce;
	} else if (newCard === 1 && roundScore === 10) {
		var newCardIsAce = 11;
		roundScore = newCardIsAce + roundScore;
		twentyOne();
		again();
	} else {
		roundScore += newCard;
	}

	if (roundScore > 31 && (card1 === 1 || card2 ===1)) {
		bust();
		again();
	} else if (roundScore > 21 && (card1 !== 1 && card2 !== 1)) {
		bust();
		again();
	} else if (roundScore === 21) {
		twentyOne();
		again();
	} else if (roundScore === 31) {
		twentyOne();
		again();
	}


	console.log(roundScore);
});

document.querySelector('.btn-stay').addEventListener('click', function() {

	dCard2 = Math.ceil(Math.random()*13);
	dSuit2 = Math.ceil(Math.random()*4);

	if (dCard2 === dCard1 && dSuit2 === dSuit1) {
		dCard2 = Math.ceil(Math.random()*13);
		dSuit2 = Math.ceil(Math.random()*4);
	}
	if (dCard2 === card1 && dSuit2 === suit1) {
		dCard2 = Math.ceil(Math.random()*13);
		dSuit2 = Math.ceil(Math.random()*4);
	}
	if (dCard2 === card2 && dSuit2 === suit2) {
		dCard2 = Math.ceil(Math.random()*13);
		dSuit2 = Math.ceil(Math.random()*4);
	}
	if (dCard2 === newCard && dSuit2 === newSuit) {
		dCard2 = Math.ceil(Math.random()*13);
		dSuit2 = Math.ceil(Math.random()*4);
	}

	var fdCardDom = document.getElementById('facedownCard');
	fdCardDom.className = "animated flip"
	fdCardDom.src = 'img/' + dCard2 + '_of_' + dSuit2 + '.png';

	//IF dealer has less than or equal to 16, he will deal one more card
	if (dCard1 === 1 && (dCard2 !== 1 && dCard2 < 10)) {
		var dCard1IsAce = 11;
		dealerScore = dCard1IsAce + dCard2;
	} else if (dCard2 === 1 && (dCard1 !== 1 && dCard1 < 10)) {
		var dCard2IsAce = 11;
		dealerScore = dCard2IsAce + dCard1;
	} else if (dCard1 === 1 && dCard2 === 1) {
		var dCard1IsAce = 11;
		dealerScore = dCard1IsAce + dCard2;
	} else if (dCard1 >= 10 && (dCard2 >= 2 && dCard2 < 10)) {
		var dCard1IsFace = 10;
		dealerScore = dCard1IsFace + dCard2;
	} else if (dCard2 >= 10 && (dCard1 >= 2 && dCard1 < 10)) {
		var dCard2IsFace = 10;
		dealerScore = dCard1 + dCard2IsFace;
	} else if (dCard1 >= 10 && dCard2 >= 10) {
		var dCard1IsFace = 10;
		var dCard2IsFace = 10;
		dealerScore = dCard1IsFace + dCard2IsFace;
	} else if (dCard1 === 1 && dCard2 >= 10) {
		var dCard1IsAce = 11;
		var dCard2IsFace = 10;
		dealerScore = dCard1IsAce + dCard2IsFace;
	} else if (dCard2 === 1 && dCard1 >= 10) {
		var dCard2IsAce = 11;
		var dCard1IsFace = 10;
		dealerScore = dCard2IsAce + dCard1IsFace;
	} else {
		dealerScore = dCard1 + dCard2;
	}

	while (dealerScore <= 16) {
		newDCard = Math.ceil(Math.random()*13);
		newDSuit = Math.ceil(Math.random()*4);
		if (newDCard === card1 && newDSuit === suit1) {
			newDCard = Math.ceil(Math.random()*13);
			newDSuit = Math.ceil(Math.random()*4);
			if (newDCard > 10) {
				newDCardIsAce = 10;
				dealerScore = dealerScore + newDCardIsAce;
			} else {
				dealerScore += newDCard;
			}
		} else if (newDCard === card2 && newDSuit === suit2) {
			newDCard = Math.ceil(Math.random()*13);
			newDSuit = Math.ceil(Math.random()*4);
			if (newDCard > 10) {
				newDCardIsAce = 10;
				dealerScore = dealerScore + newDCardIsAce;
			} else {
				dealerScore += newDCard;
			}
		} else if (newDCard === newCard && newDSuit === newSuit) {
			newDCard = Math.ceil(Math.random()*13);
			newDSuit = Math.ceil(Math.random()*4);
			if (newDCard > 10) {
				newDCardIsAce = 10;
				dealerScore = dealerScore + newDCardIsAce;
			} else {
				dealerScore += newDCard;
			}
		} else if (newDCard === dCard1 && newDSuit === dSuit1) {
			newDCard = Math.ceil(Math.random()*13);
			newDSuit = Math.ceil(Math.random()*4);
			if (newDCard > 10) {
				newDCardIsAce = 10;
				dealerScore = dealerScore + newDCardIsAce;
			} else {
				dealerScore += newDCard;
			}
		} else if (newDCard === dCard2 && newDSuit === dSuit2) {
			newDCard = Math.ceil(Math.random()*13);
			newDSuit = Math.ceil(Math.random()*4);
			if (newDCard > 10) {
				newDCardIsAce = 10;
				dealerScore = dealerScore + newDCardIsAce;
			} else {
				dealerScore += newDCard;
			}
		} else if (newDCard === newDCard && newDSuit === newDSuit) {
			newDCard = Math.ceil(Math.random()*13);
			newDSuit = Math.ceil(Math.random()*4);
			if (newDCard > 10) {
				newDCardIsAce = 10;
				dealerScore = dealerScore + newDCardIsAce;
			} else {
				dealerScore += newDCard;
			}
		} else {
			if (newDCard > 10) {
				newDCardIsAce = 10;
				dealerScore = dealerScore + newDCardIsAce;
			} else {
				dealerScore += newDCard;
			}
		}
		if ((dCard1 === 1 || dCard2 === 1 || newDCard === 1) && dealerScore > 21) {
		dealerScore = dealerScore - 10;
		}
		var dealtDCard = document.createElement('img');
		dealtDCard.setAttribute('src', 'img/' + newDCard + '_of_' + newDSuit + '.png');
		dealtDCard.className = 'animated bounceInRight'
		document.querySelector('.dealer').appendChild(dealtDCard);
	};

	if (roundScore > 21) {
		roundScore = roundScore - 10;
	}	

	console.log(roundScore);
	console.log(dealerScore);
	if (roundScore > dealerScore || dealerScore > 21) {
		var winH1 = document.createElement('h1');
		var textHere = document.createTextNode('You Win!');
		winH1.appendChild(textHere);
		var addHere = document.getElementById('body');
		addHere.appendChild(winH1)
		again();
	} else if (roundScore < dealerScore) {
		var loseH1 = document.createElement('h1');
		var textHere = document.createTextNode('You Lose...');
		loseH1.appendChild(textHere);
		var addHere = document.getElementById('body');
		addHere.appendChild(loseH1)
		again();
	} else {
		var drawH1 = document.createElement('h1');
		var textHere = document.createTextNode('It\'s a Draw');
		drawH1.appendChild(textHere);
		var addHere = document.getElementById('body');
		addHere.appendChild(drawH1)
		again();
	}

})
document.querySelector('.btn-again').addEventListener('click', function(){

	location.reload();
})

function init() {
	card1 = Math.ceil(Math.random()*13);
	card2 = Math.ceil(Math.random()*13);
	dCard1 = Math.ceil(Math.random()*13);
	suit1 = Math.ceil(Math.random()*4);
	suit2 = Math.ceil(Math.random()*4);
	dSuit1 = Math.ceil(Math.random()*4);
	newCard = Math.ceil(Math.random()*13);
	newSuit = Math.ceil(Math.random()*4);

	//make sure no same cards are dealt
	if(suit1 === suit2 && card1 === card2) {
		card2 = Math.ceil(Math.random()*13);
		suit2 = Math.ceil(Math.random()*4);	
	} 
	if (dCard1 === card1 && dSuit1 === suit1) {
		dCard1 = Math.ceil(Math.random()*13);
		dSuit1 = Math.ceil(Math.random()*4);
	} 
	if (dCard1 === card2 && dSuit1 === suit2) {
		dCard1 = Math.ceil(Math.random()*13);
		dSuit1 = Math.ceil(Math.random()*4);
	}

	if (card1 === 1 && (card2 !== 1 && card2 < 10)) {
		var card1IsAce = 11;
		roundScore = card1IsAce + card2;
	} else if (card2 === 1 && (card1 !== 1 && card1 < 10)) {
		var card2IsAce = 11;
		roundScore = card2IsAce + card1;
	} else if (card1 === 1 && card2 === 1) {
		var card1IsAce = 11;
		roundScore = card1IsAce + card2;
	} else if (card1 >= 10 && (card2 >= 2 && card2 < 10)) {
		var card1IsFace = 10;
		roundScore = card1IsFace + card2;
	} else if (card2 >= 10 && (card1 >= 2 && card1 < 10)) {
		var card2IsFace = 10;
		roundScore = card1 + card2IsFace;
	} else if (card1 >= 10 && card2 >= 10) {
		var card1IsFace = 10;
		var card2IsFace = 10;
		roundScore = card1IsFace + card2IsFace;
	} else if (card1 === 1 && card2 >= 10) {
		var card1IsAce = 11;
		var card2IsFace = 10;
		roundScore = card1IsAce + card2IsFace;
	} else if (card2 === 1 && card1 >= 10) {
		var card2IsAce = 11;
		var card1IsFace = 10;
		roundScore = card2IsAce + card1IsFace;
	} else {
		roundScore = card1 + card2;
	}
}

function again() {
	document.querySelector('.btn-again').style.display = 'inline-block';
	document.querySelector('.btn-hit').style.display = 'none';
	document.querySelector('.btn-stay').style.display = 'none';
}

function bust() {
	var bustH1 = document.createElement('h1');
	var textHere = document.createTextNode('Bust!');
	bustH1.appendChild(textHere);
	var addHere = document.getElementById('body');
	addHere.appendChild(bustH1)
}

function twentyOne() {
	var twentyH1 = document.createElement('h1');
	var textHere = document.createTextNode('You win with 21!');
	twentyH1.appendChild(textHere);
	var addHere = document.getElementById('body');
	addHere.appendChild(twentyH1)
}