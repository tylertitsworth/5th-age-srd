function powerPrint() {
    //Get every checkbox
    var checkedBoxes = document.querySelectorAll('input[name=toPrint]:checked');
    //Clear the local storage so we don't get duplicate cards
    localStorage.clear()
    // localStorage.setItem("cardsToPrint", checkedBoxes)
    // Checkboxes will be hidden on next page, otherwise current page will lose checkboxes
    // Make a new webpage using the information in checkedBoxes

    var cards = []
    for(var i = 0; i < checkedBoxes.length; i++){
    var currentNode = checkedBoxes[i].parentNode
    currentNode.querySelector(".toPrintCheckbox").remove()
    var cardScript = '<div class = "powerCard">\n' + currentNode.innerHTML + '\n</div>'
    cards.push(cardScript)
    // console.log(currentNode.innerHTML)
    }
     localStorage.setItem("cardsToPrint", cards)
     window.location.href = "../../Printing/README.html"
     
}
function createButtons(){
    // Get the wrapper that contains all of our class stuff
    var wrapper = document.getElementById("content-wrapper")
    if(!wrapper){
        console.log("wrapper is null")
        return
    }

    //Go through each div in the class and add a print checkbox
    //TODO: Remove check box from divs that should not be printed
    var nodes = wrapper.getElementsByTagName("div");
    for(var i = 0; i < nodes.length; i++){
        var checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.name = "toPrint"
        checkbox.className ="toPrintCheckbox"
        // nodes[i].appendChild(checkbox)
        //Insert the checbox right after the heading
        nodes[i].insertBefore(checkbox, nodes[i].children[1])
    }

}

document.addEventListener("DOMContentLoaded", function() {
    createButtons()
  })