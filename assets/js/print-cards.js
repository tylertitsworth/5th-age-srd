function addCards(){
    var cards = localStorage.getItem("cardsToPrint")
    
    console.log(cards)
    document.body.innerHTML = cards
}

document.addEventListener("DOMContentLoaded", function() {
    addCards()
  })