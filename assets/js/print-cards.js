function addCards(){
    var cards = localStorage.getItem("cardsToPrint")
    // var wrapper = document.getElementById("content-wrapper");
    var footer = document.querySelector(".site-footer")
    console.log(cards)

    footer.insertAdjacentHTML('beforebegin', cards)



    // document.body.innerHTML += cards
}

function printPage(){
    window.print()
}

document.addEventListener("DOMContentLoaded", function() {
    addCards()
    document.getElementsByClassName("power-button")[0].style.display ="none"
    document.getElementById("printButton").addEventListener("click", printPage)
  })