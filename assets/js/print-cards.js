//Checks if the element is feat heading
function checkFeats(siblingNode) {
	if (!siblingNode) {
		return false
	}

	if (siblingNode.id.indexOf("adventurer-feat") > -1 || siblingNode.id.indexOf("champion-feat") > -1 || siblingNode.id.indexOf("epic-feat") > -1) {
		return true
	}

	return false
}

//Creates an empty div to space out elements
function createEmptyDiv() {
	var emptyDiv = document.createElement("div")

	emptyDiv.classList.add("powerCard")
	emptyDiv.classList.add("emptyCardBack")
	return emptyDiv
}

//https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing
//NOTE: This only works if the element in question has overflow set to hidden!
//Returns whether or not the div is overflowing
function isOverflown(element) {
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

//Rips the all tables from the card and adds them to their own card
//If the card overflows, then the table is simply too big to fit on a card
//All tables that fit are passed on as their own cards.
function tableHandler(card, wrapper) {
	var table = card.querySelectorAll("table")
	var tableDivs = []

	if (table) {
		let tableElementsLength = table.length

		for (let i = 0; i < tableElementsLength; i++) {
			let tempDiv = document.createElement("div")
			tempDiv.classList.add("powerCard")
			tempDiv.appendChild(table[i])
			wrapper.appendChild(tempDiv)

			if (isOverflown(table[i])) {
				table[i].remove()
				continue
			}

			tableDivs.push(tempDiv)
		}
	}

	return tableDivs
}

//Adds the number of the card to the top of the card
function insertCardNumber(card, cardNumber) {
	var paragraphNode = document.createElement("p")

	paragraphNode.innerHTML = cardNumber
	paragraphNode.classList.add("cardNumber")
	card.insertBefore(paragraphNode, card.children[0])
}

//Recursively calls itself to prune a card, if a card has more overflow than
//can fit on one additional card, it will call itself again to prune overflow again
function pruningHandler(card, wrapper, cardNumber) {
	var processedCard = pruneCard(card)
	cardNumber++

	insertCardNumber(processedCard, cardNumber)
	wrapper.appendChild(processedCard)

	if (isOverflown(processedCard)) {
		cardNumber = pruningHandler(processedCard, wrapper, cardNumber)
	}
	return cardNumber
}

//Prunes the card and returns a new card with the excess elements
//PushNumber keeps track of number of elements because I don't trust JS .length function
function pruneCard(card) {
	var over = []
	var pushNumber = 0

	while (1) {
		over.push(card.lastElementChild.outerHTML)
		card.lastElementChild.remove()
		pushNumber++

		//Check if the next line is a feat heading
		//If it is, we want to try and group it with it's text
		if (checkFeats(card.lastElementChild)) {
			over.push(card.lastElementChild.outerHTML)
			card.lastElementChild.remove()
			pushNumber++
		}
		if (!isOverflown(card)) {
			break
		}
	}
	return newCard(over, pushNumber)

}

//Makes a new card with elements that were overflowing from the previous card
function newCard(overflowElements, overflowStackSize) {
	var cardScript = ""

	//I can't use overflowElements.length because it returns the length
	//of the stack/2 rounded down, instead of the actual size
	//So I have to literally count how many pushes I made to pop them all off
	//Pretty sure it's because the size of the array is constantly changing
	for (var i = 0; i < overflowStackSize; i++) {
		cardScript += overflowElements.pop()
	}

	var card = document.createElement("div")
	card.classList.add("powerCard")
	card.innerHTML = cardScript

	return card
}

//Handler for cards
//Checks each card if it overflows, if it does, prune them
//Each card must be added to the wrapper in order to check if it overflows sadly
function overflowHandling(cards) {
	var intialLength = cards.length
	var wrapper = document.getElementById("content-wrapper");
	var prunedCardArray = document.createElement("div")

	for (let i = 0; i < intialLength; i++) {
		insertCardNumber(cards[i], 1)
		wrapper.appendChild(cards[i])

		//If the card overflows, rip off all tables and insert into a new card
		//If it still overflows, recursively prune until we have a set of cards
		//Then take all of the cards out of the wrapper so we can test more cards
		if (isOverflown(cards[i])) {
			var cardsWithTables = tableHandler(cards[i], wrapper)
			var cardNumber = 1

			if (isOverflown(cards[i])) {
				cardNumber = pruningHandler(cards[i], wrapper, cardNumber)
			}


			var divsToMove = wrapper.querySelectorAll(".powerCard")
			var divsToMoveLength = divsToMove.length

			for (let j = 0; j < divsToMoveLength; j++) {
				prunedCardArray.appendChild(divsToMove[j])
			}

			var cardsWithTablesLength = cardsWithTables.length

			//If we had any tables, we want to append them to the end
			if (cardsWithTablesLength) {
				for (var b = 0; b < cardsWithTablesLength; b++) {
					insertCardNumber(cardsWithTables[b], cardNumber + b + 1)
					prunedCardArray.appendChild(cardsWithTables[b])
				}

				divsToMoveLength + cardsWithTablesLength

			}

			//If the length is odd, we want to add empty divs to space out the backside
			if (divsToMoveLength % 2) {
				prunedCardArray.appendChild(createEmptyDiv())
			}
		}
		//Only one card, remove it from wrapper and add the backside
		else {
			var divToMove = wrapper.querySelector(".powerCard")

			prunedCardArray.appendChild(divToMove)
			prunedCardArray.appendChild(createEmptyDiv())

		}

	}

	//All cards have been processed, add everything back to the wrapper to be printed
	var divsInContainer = prunedCardArray.querySelectorAll(".powerCard")
	var divsInContainerLength = divsInContainer.length

	//Everything has to be divisible by 6, as two pages fits 6 cards
	//3 front facing and 3 back facing cards
	while (divsInContainerLength % 6) {
		prunedCardArray.appendChild(createEmptyDiv())
		divsInContainerLength++
	}

	divsInContainer = prunedCardArray.querySelectorAll(".powerCard")
	divsInContainerLength = divsInContainer.length

	//Grab the cards in sets of six, odd cards are front facing cards
	//Even cards are back facing
	//We add classes to differentiate the cards to make sure that the cards
	//end up in the right spot when printing.
	//No guarantees that the printer will perfectly fit the cards together though
	var j = 0
	var k = 1

	while ((j + k) / 2 < divsInContainerLength) {
		var arrAInc = 0
		var arrBInc = 0

		var centeringDiv = document.createElement("div")
		centeringDiv.classList.add("centeringDiv")
		centeringDiv.classList.add("frontDiv")
		for (; j < divsInContainerLength; j += 2) {
			if (arrAInc == 3) {
				break;
			}

			divsInContainer[j].classList.add("cardFront")
			centeringDiv.appendChild(divsInContainer[j])
			arrAInc++
		}

		wrapper.appendChild(centeringDiv)


		centeringDiv = document.createElement("div")
		centeringDiv.classList.add("centeringDiv")
		centeringDiv.classList.add("backDiv")
		for (; k < divsInContainerLength; k += 2) {
			if (arrBInc == 3) {
				break;
			}

			divsInContainer[k].classList.add("cardBack")
			centeringDiv.appendChild(divsInContainer[k])
			arrBInc++
		}

		wrapper.appendChild(centeringDiv)

	}
}
//Adds the intial cards from localStorage to a div to convert from a string to nodes
//Then calls overflowHandling to process
function addCards() {
	var cards = localStorage.getItem("cardsToPrint")
	var tempDiv = document.createElement("div")

	tempDiv.innerHTML += cards
	//Why does querySelctorAll work and getElementsbyClassName not work
	//Apparently the results are returned as a Nodelist and not an array
	var powerDivs = tempDiv.querySelectorAll(".powerCard")
	overflowHandling(powerDivs)
}

function printPage() {
	window.print()
	setTimeout("window.close()", 3000);
}

document.addEventListener("DOMContentLoaded", function () {
	addCards()
	printPage()
})
