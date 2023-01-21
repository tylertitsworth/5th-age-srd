//Taken from power-cards.js
//TODO: Remember how to include a single function from another JS file
function checkFeats(siblingNode){
  if(!siblingNode){
      return false
  }
  if(siblingNode.id.indexOf("adventurer-feat") > -1 || siblingNode.id.indexOf("champion-feat") > -1 || siblingNode.id.indexOf( "epic-feat") > -1){
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

function tableHandler(card, wrapper){
  var table = card.querySelectorAll("table")
  var tableDivs = [] 
  if(table){
    let tableElementsLength = table.length
    for(let i = 0; i < tableElementsLength; i++){
      let tempDiv = document.createElement("div")
      tempDiv.classList.add("powerCard")
      tempDiv.appendChild(table[i])
      wrapper.appendChild(tempDiv)

      if(isOverflown(table[i])){
        table[i].remove()
        continue
      }
      tableDivs.push(tempDiv)
    }
  }


  return tableDivs
}

//Recursively calls itself to prune a card, if a card has more overflow than
//can fit on one additional card, it will call itself again to prune overflow again
//Apparently this does not work because the card has to be visible on the dom to
//detect overflows, rework to add to dom temporaryily to change effects

//Recursively calls itself to prune a card
function pruningHandler(card, wrapper, cardNumber){
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

    card.lastElementChild.remove()
    pushNumber++
    //Check if the next line is a heading
    //If it is, we want to try and group it with it's text
    //So push it too
    if(checkFeats(card.lastElementChild)){
      over.push(card.lastElementChild.outerHTML)
      card.lastElementChild.remove()
      pushNumber++
    }
    if(!isOverflown(card)){
      break
    }
  }
  return newCard(over, pushNumber)

}

function newCard(overflowElements, overflowStackSize){
  var cardScript = ""

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
    console.log(cards)
    for(let i = 0; i < intialLength; i++){
      console.log("Card number " + i)
      insertCardNumber(cards[i], 1)
      wrapper.appendChild(cards[i])
      if(isOverflown(cards[i])){
          var cardsWithTables = tableHandler(cards[i], wrapper)
          var noPrune = 0
          if(isOverflown(cards[i])){
            pruningHandler(cards[i], wrapper, 2)
          }
          else{
            noPrune = 1
          }
          var divsToMove = wrapper.querySelectorAll(".powerCard")
          var divsToMoveLength = divsToMove.length

          for(let j = 0; j < divsToMoveLength; j++){
            prunedCardArray.appendChild(divsToMove[j])
          }


          var cardsWithTablesLength = cardsWithTables.length
          if(cardsWithTablesLength){
            var cardsWithTablesLength = cardsWithTables.length
            for(var b = 0; b < cardsWithTablesLength; b++){
              insertCardNumber(cardsWithTables[b], divsToMoveLength + b + 1 - noPrune)
              prunedCardArray.appendChild(cardsWithTables[b])
            }
            divsToMoveLength + cardsWithTablesLength
          }
          //If the length is odd 
          if(divsToMoveLength % 2){
            prunedCardArray.appendChild(createEmptyDiv())
          }
        }
        else{
          // console.log("only one card")
          // var cardContainer = document.createElement("div")
          var divToMove = wrapper.querySelector(".powerCard")
          prunedCardArray.appendChild(divToMove)

          // var cardsWithTablesLength = cardsWithTables.length
          // if(cardsWithTablesLength){
          //   var cardsWithTablesLength = cardsWithTables.length
          //   var b = 0
          //   for(; b < cardsWithTablesLength; b++){
          //     insertCardNumber(cardsWithTables[b], b + 1)
          //     prunedCardArray.appendChild(cardsWithTables[b])
          //   }
          //   b += 1
            
          //   if (b % 2){
          //     prunedCardArray.appendChild(createEmptyDiv())
          //   }

          // }
          // else {
          prunedCardArray.appendChild(createEmptyDiv())
          // console.log(cardContainer.innerHTML)
          // prunedCardArray.push(cardContainer)
          // }
        }

    }
    console.log("Adding back to the wrapper")
    var divsInContainer = prunedCardArray.querySelectorAll(".powerCard")
    var divsInContainerLength = divsInContainer.length
    while(divsInContainerLength % 6){
      prunedCardArray.appendChild(createEmptyDiv())
      divsInContainerLength++
    }

    divsInContainer = prunedCardArray.querySelectorAll(".powerCard")
    divsInContainerLength = divsInContainer.length

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
    overflowHandling(powerDivs)
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