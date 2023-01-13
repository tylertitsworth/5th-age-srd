//https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing
function isOverflown(element) {
    console.log("ScrollHeight ", element.scrollHeight)
    console.log("ClientHeight ", element.clientHeight)
    console.log("ScrollWidth ", element.scrollWidth)
    console.log("ClientWidth", element.clientWidth)
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  
function overflowHandling(cards){
    for(var i = 0; i < cards.length; i++){
        console.log(cards[i])
        if(isOverflown(cards[i])){
            console.log("OVERFLOW at ", i)
        }
    }
    console.log("checked for overflows")
    //console.log(document.body.innerHTML)

}
function addCards(){
    var cards = localStorage.getItem("cardsToPrint")
    // var wrapper = document.getElementById("content-wrapper");
    var footer = document.querySelector(".site-footer")
    //console.log(cards)
    footer.insertAdjacentHTML('beforebegin', cards)
    // document.body.innerHTML += cards
}

function printPage(){
  //  var sheet = document.getElementById("standardStyle")
   // sheet.setAttribute("href", "../assets/css/powerPrintRescale.css")
  //  var cards = document.getElementsByClassName("powerCard")
  //  overflowHandling(cards)
    window.print()
}

document.addEventListener("DOMContentLoaded", function() {
    // var mediaChange = window.matchMedia("print")
    // overflowHandling(mediaChange)
    // mediaChange.addEventListener(overflowHandling)

    addCards()
    document.getElementsByClassName("power-button")[0].style.display ="none"
    document.getElementById("printButton").addEventListener("click", printPage)
    
    
  })