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
function pruningHandler(card, wrapper){
  var processedCard = pruneCard(card)
  wrapper.appendChild(processedCard)
  if(isOverflown(processedCard)){
    pruningHandler(processedCard, wrapper)
  }

  return
}

//Prunes the card and returns the overflowing elements
//TODO: Check if the next element is a heading, if so, push it as well
//TODO: Add card numbers to each card
//TODO: Add main card headings to each card
//TODO: Add table support
//WHY IS THE LENGTH OF A STACK HALF THE ACTUAL SIZE OF THE STACK, JAVASCRIPT WHYYYYY
//When I append something to something else, it actually removes from intial data structure
//And appends to the new one, shrinking the data structure
//As I increment, the length of the list is decremented, resulting in the above behavior
function pruneCard(card){
  var over = []
  var pushNumber = 0
  while(1){
    pushNumber += 1
    over.push(card.lastElementChild.outerHTML)
    // console.log("Inner HTML")
    // console.log(card.lastElementChild.innerHTML)
    // console.log("Outer HTML")
    // console.log(card.lastElementChild.outerHTML)
    card.lastElementChild.remove()
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
  // console.log("after pop")
  // console.log(overflowElements)
  // console.log("CardScript for new card ")
  // console.log(cardScript)
  var card = document.createElement("div")
  card.classList.add("powerCard")
  card.innerHTML = cardScript
  // console.log("Card Script is")
  // console.log(cardScript)

  return card
}

function overflowHandling(cards){
   var intialLength = cards.length
   var wrapper = document.getElementById("content-wrapper");
   var prunedCardArray = []
    console.log("WAT")
    console.log(cards)
    for(var i = 0; i < intialLength; i++){
      console.log("Card number " + i)
      wrapper.appendChild(cards[i])
        //console.log(cards[i].innerHTML)
      if(isOverflown(cards[i])){
          //console.log("OVERFLOW at ", i)
          pruningHandler(cards[i], wrapper)
          var cardContainer = document.createElement("div")
          var divsToMove = wrapper.querySelectorAll(".powerCard")
          var divsToMoveLength = divsToMove.length
          console.log("MOVING")
          console.log(divsToMove)
          for(var j = 0; j < divsToMoveLength; j++){
            cardContainer.appendChild(divsToMove[j])
          }
          prunedCardArray.push(cardContainer)
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
          console.log("only one card")
          var cardContainer = document.createElement("div")
          var divToMove = wrapper.querySelector(".powerCard")
          cardContainer.appendChild(divToMove)
          prunedCardArray.push(cardContainer)
        }

    }
    console.log("Adding back to the wrapper")
    console.log(prunedCardArray)
    var prunedCardArrayLength = prunedCardArray.length
    for(var i = 0; i < prunedCardArrayLength; i++){
      var divsInContainer = prunedCardArray[i].querySelectorAll(".powerCard")
      var subContainerLength = divsInContainer.length
      for(var j = 0; j < subContainerLength; j++){
        wrapper.appendChild(divsInContainer[j])
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