//Taken from power-cards.js
//TODO: Remember how to include a single function from another JS file
function checkFeats(siblingNode){
  if(!siblingNode){
      return false
  }
  if(siblingNode.id.indexOf("adventurer-feat") > -1 || siblingNode.id.indexOf("champion-feat") > -1 || siblingNode.id.indexOf( "epic-feat") > -1){
    console.log("ID: ", siblingNode.id)
    return true
  }

  return false
}

function createEmptyDiv(){
  var emptyDiv = document.createElement("div")
  emptyDiv.classList.add("powerCard")
  emptyDiv.classList.add("emptyCardBack")
  return emptyDiv
}

//https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing
//NOTE: This only works if the element in question has overflow set to hidden!
function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

//Recursively calls itself to prune a card, if a card has more overflow than
//can fit on one additional card, it will call itself again to prune overflow again
//Apparently this does not work because the card has to be visible on the dom to
//detect overflows, rework to add to dom temporaryily to change effects

//Recursively calls itself to prune a card
function pruningHandler(card, wrapper,cardNumber){
  var processedCard = pruneCard(card)
  insertCardNumber(processedCard, cardNumber)
  wrapper.appendChild(processedCard)
  if(isOverflown(processedCard)){
    pruningHandler(processedCard, wrapper, cardNumber + 1)
  }

  return
}

function insertCardNumber(card, cardNumber){
  
  var paragraphNode = document.createElement("p")
  paragraphNode.innerHTML = cardNumber
  paragraphNode.classList.add("cardNumber")
  card.insertBefore(paragraphNode, card.children[0])
}

//Prunes the card and returns the overflowing elements
//TODO: Add card numbers to each card
//TODO: Add main card headings to each card
//TODO: TEST REALLY BIG TABLES, THEY FAIL
//WHY IS THE LENGTH OF A STACK HALF THE ACTUAL SIZE OF THE STACK, JAVASCRIPT WHYYYYY
//When I append something to something else, it actually removes from intial data structure
//And appends to the new one, shrinking the data structure
//As I increment, the length of the list is decremented, resulting in the above behavior
//Or it might be because if I use get elements by ____ I don't get a proper list of nodes
//I've noticed that using query selector works better, I should use it more
function pruneCard(card){
  var over = []
  var pushNumber = 0
  while(1){
    over.push(card.lastElementChild.outerHTML)
    // console.log("Inner HTML")
    // console.log(card.lastElementChild.innerHTML)
    // console.log("Outer HTML")
    // console.log(card.lastElementChild.outerHTML)
    card.lastElementChild.remove()
    pushNumber++
    //Check if the next line is a heading
    //If it is, we want to try and group it with it's text
    //So push it too
    // console.log(card.lastElementChild.outerHTML)
    if(checkFeats(card.lastElementChild)){
      over.push(card.lastElementChild.outerHTML)
      console.log(card.lastElementChild.outerHTML)
      card.lastElementChild.remove()
      pushNumber++
    }
    if(!isOverflown(card)){
      break
    }
   // console.log(over)
  }
  // console.log("PushNumber " + pushNumber)
  return newCard(over, pushNumber)

}

function newCard(overflowElements, overflowStackSize){
  var cardScript = ""
  // console.log("overflow elements")
  // console.log(overflowElements)
  //I can't use overflowElements.length because it returns the length
  // of the stack/2 rounded down, instead of the actual size
  //So I have to literally count how many pushes I made to pop them all off
  for(var i = 0; i < overflowStackSize; i++){
    cardScript += overflowElements.pop()
  }

  var card = document.createElement("div")
  card.classList.add("powerCard")
  card.innerHTML = cardScript
  return card
}

function overflowHandling(cards){
   var intialLength = cards.length
   var wrapper = document.getElementById("content-wrapper");
   var prunedCardArray = document.createElement("div")
    // console.log("WAT")
    console.log(cards)
    for(let i = 0; i < intialLength; i++){
      console.log("Card number " + i)
      insertCardNumber(cards[i], 1)
      wrapper.appendChild(cards[i])
        //console.log(cards[i].innerHTML)
      if(isOverflown(cards[i])){
          //console.log("OVERFLOW at ", i)
          pruningHandler(cards[i], wrapper, 2)
          // var cardContainer = document.createElement("div")
          var divsToMove = wrapper.querySelectorAll(".powerCard")
          var divsToMoveLength = divsToMove.length
          // console.log("MOVING")
          // console.log(divsToMove)
          for(let j = 0; j < divsToMoveLength; j++){
            prunedCardArray.appendChild(divsToMove[j])
          }
          //If the length is odd 
          if(divsToMoveLength % 2){
            prunedCardArray.appendChild(createEmptyDiv())
          }
          // prunedCardArray.push(cardContainer)
          // var prunedCard = pruneCard(cards[i])
          // var wrapper = document.getElementById("content-wrapper");
          // wrapper.appendChild(prunedCard)
          // console.log("This is the cardstack")
          // console.log(cardStack)
          // console.log("First Card")
          // console.log(cardStack[0])

          // for(var j = 0; j < cardStack.length; j++){
          //   var wrapper = document.getElementById("content-wrapper");

          //   var poppedCard = cardStack.pop()
          //   // console.log("Popped Card")
          //   // console.log(poppedCard.innerHTML)
          //   wrapper.appendChild(poppedCard)
          // }
        }
        else{
          // console.log("only one card")
          // var cardContainer = document.createElement("div")
          var divToMove = wrapper.querySelector(".powerCard")
          prunedCardArray.appendChild(divToMove)

          prunedCardArray.appendChild(createEmptyDiv())
          // console.log(cardContainer.innerHTML)
          // prunedCardArray.push(cardContainer)
        }

    }
    console.log("Adding back to the wrapper")
    console.log(prunedCardArray)
    var divsInContainer = prunedCardArray.querySelectorAll(".powerCard")
    var divsInContainerLength = divsInContainer.length
    // console.log("Number of divs: ", divsInContainerLength)
    while(divsInContainerLength % 3){
      prunedCardArray.appendChild(createEmptyDiv())
      divsInContainerLength++
    }

    divsInContainer = prunedCardArray.querySelectorAll(".powerCard")
    divsInContainerLength = divsInContainer.length
    // console.log("Number of divs: ", divsInContainerLength)

        // for(var j = 0; j < divsInContainerLength; j++){
        // wrapper.appendChild(divsInContainer[j])
        // }


      var j = 0
      var k = 1
      while((j + k)/2 < divsInContainerLength){
        var arrAInc = 0
        var arrBInc = 0
        for(; j < divsInContainerLength; j+=2){
          if(arrAInc == 3){
            break;
          }
          divsInContainer[j].classList.add("cardFront")
          wrapper.appendChild(divsInContainer[j])
          arrAInc++
        }
        for(; k < divsInContainerLength; k+=2){
          if(arrBInc == 3){
            break;
          }
          divsInContainer[k].classList.add("cardBack")
          wrapper.appendChild(divsInContainer[k])
          arrBInc++
        }
    }
    console.log("checked for overflows")
}

function addCards(){
    var cards = localStorage.getItem("cardsToPrint")
    var wrapper = document.getElementById("content-wrapper");
   //var footer = document.querySelector(".site-footer")
    //console.log(cards)
    //footer.insertAdjacentHTML('beforebegin', cards)
    // document.body.innerHTML += cards
    //wrapper.innerHTML += cards

    var tempDiv = document.createElement("div")
    //console.log(cards)
    tempDiv.innerHTML += cards
    //Why does querySelctorAll work and getElementsbyClassName not work
    //Apparently the results are returned as a Nodelist and not an array
    var powerDivs = tempDiv.querySelectorAll(".powerCard")
    // console.log(powerDivs)
    // console.log(powerDivs.length)
    // //I'm running into the same issue, the length of the collection is incorrect
    // var powerDivLength = powerDivs.length
    // for(var i = 0; i < powerDivLength; i++){
    //   // console.log("LENGTH:", powerDivs.length)
    //   console.log(powerDivs[i].innerHTML)
    //   wrapper.appendChild(powerDivs[i])
    //   // console.log("Appending ", i)
    // }
    overflowHandling(powerDivs)


    //If I don't run the for loop directly after getting the Elements, the length is correct
    //Maybe the script is running too fast?
    // var i = 0
    // while(!powerDivs[i]){
    //   wrapper.appendChild(powerDivs[i])
    //   i++
    // }


}

function printPage(){
  //  var sheet = document.getElementById("standardStyle")
   // sheet.setAttribute("href", "../assets/css/powerPrintRescale.css")
  //  var cards = document.getElementsByClassName("powerCard")
  //  overflowHandling(cards)
//  window.print()
  console.log("Printing lmao")
 // window.close()
}

document.addEventListener("DOMContentLoaded", function() {
    // var mediaChange = window.matchMedia("print")
    // overflowHandling(mediaChange)
    // mediaChange.addEventListener(overflowHandling)

    addCards()
    printPage()
    // document.getElementsByClassName("power-button")[0].style.display ="none"
    // document.getElementById("printButton").addEventListener("click", printPage)
    
  })