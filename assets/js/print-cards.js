//https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing
//NOTE: This only works if the element in question has overflow set to hidden!
function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

//Recursively calls itself to prune a card, if a card has more overflow than
//can fit on one additional card, it will call itself again to prune overflow again
//Apparently this does not work because the card has to be visible on the dom to
//detect overflows, rework to add to dom temporaryily to change effects
function pruningHandler(card, cardStack){
  var processedCard = pruneCard(card)
  if(isOverflown(processedCard)){
    pruningHandler(processedCard, cardStack)
    cardStack.push(processedCard)
  }
  else{
    cardStack.push(processedCard)
  }
  return
}

//Prunes the card and returns the overflowing elements
//TODO: Check if the next element is a heading, if so, push it as well
//TODO: Add card numbers to each card
//TODO: Add main card headings to each card
//TODO: Add table support
//WHY IS THE LENGTH OF A STACK HALF THE ACTUAL SIZE OF THE STACK, JAVASCRIPT WHYYYYY
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
  console.log("PushNumber " + pushNumber)
  return newCard(over, pushNumber)

}

function newCard(overflowElements, overflowStackSize){
  var cardScript = ""
  console.log("overflow elements")
  console.log(overflowElements)
  //I can't use overflowElements.length because it returns the length
  // of the stack/2 rounded down, instead of the actual size
  //So I have to literally count how many pushes I made to pop them all off
  for(var i = 0; i < overflowStackSize; i++){
    cardScript += overflowElements.pop()
  }
  console.log("after pop")
  console.log(overflowElements)
  // console.log("CardScript for new card ")
  // console.log(cardScript)
  var card = document.createElement("div")
  card.classList.add("powerCard")
  card.innerHTML = cardScript
  console.log("Card Script is")
  console.log(cardScript)

  return card
}

function overflowHandling(cards){
  //TEMPORARY MANNNNN
  // var intialLength = cards.length
    for(var i = 0; i < cards.length; i++){
      console.log("Card number " + i)
        //console.log(cards[i].innerHTML)
        if(isOverflown(cards[i])){
            //console.log("OVERFLOW at ", i)
            var cardStack = []
            var prunedCard = pruneCard(cards[i])
            var wrapper = document.getElementById("content-wrapper");
            wrapper.appendChild(prunedCard)
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
    wrapper.innerHTML += cards
}

function printPage(){
  //  var sheet = document.getElementById("standardStyle")
   // sheet.setAttribute("href", "../assets/css/powerPrintRescale.css")
   var cards = document.getElementsByClassName("powerCard")
   overflowHandling(cards)
  //  window.print()
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