function addCards(){
    var cards = localStorage.getItem("cardsToPrint")
    // var wrapper = document.getElementById("content-wrapper");
    var footer = document.querySelector(".site-footer")
    console.log(cards)
    // for(var i = 0; i < cards.length; i++){
    //     // var cardScript = '<div class = "powerCard">\n' + cards.innerHTML + '\n</div>'
    //     var cardDiv = document.createElement("div")
    //     cardDiv.class = "powerCard"
    //     cardDiv.innerHTML = cards[i]
    //     wrapper.appendChild(cardDiv)
    // }

   // wrapper.innerHTML += cards
    footer.insertAdjacentHTML('beforebegin', cards)



    // document.body.innerHTML += cards
}

document.addEventListener("DOMContentLoaded", function() {
    addCards()
  })