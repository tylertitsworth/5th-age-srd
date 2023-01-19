function checkFeats(siblingNode){
    if(siblingNode.classList.contains("adventurer-feat") || siblingNode.classList.contains("champion-feat") || siblingNode.classList.contains("epic-feat")){
       return true
    }

    return false
}

function powerPrint() {
    //Get every checkbox
    var checkedBoxes = document.getElementsByClassName("printHighlight");
    //Clear the local storage so we don't get duplicate cards
    localStorage.clear()
    // Checkboxes will be hidden on next page, otherwise current page will lose checkboxes
    // Make a new webpage using the information in checkedBoxes

    var cards = ""
    for(var i = 0; i < checkedBoxes.length; i++){
        var currentNode = checkedBoxes[i].parentNode
        console.log(currentNode)
        // currentNode.querySelector(".toPrintCheckbox").remove()
        var cardScript = '<div class = "powerCard">\n'
        var siblingNode = currentNode.nextElementSibling

        cardScript += currentNode.innerHTML
        while(1){
            if(checkFeats(siblingNode)){
                cardScript += siblingNode.innerHTML
                siblingNode = siblingNode.nextElementSibling
                continue
            }
            break;
        }

        cardScript += '\n</div>\n'
        cards += cardScript

      //  console.log(cardScript)

        // console.log(currentNode.innerHTML)
    }
     localStorage.setItem("cardsToPrint", cards)
     window.location.href = "../../assets/html/printing_identification.html"
  // window.location.href = "../_includes/printing_identification.html"
     
}

function highlightingListener(element){
    if(checkFeats(element)){
        return
    }

    if(element.firstElementChild.classList.contains("printHighlight")){
        element.firstElementChild.classList.remove("printHighlight")
    }
    else{
        element.firstElementChild.classList.add("printHighlight")
    }
    
    return
}

function addPrintBehavior(){
    
    //Disable anchors in page, and insert new behavior
    var anchors = document.getElementsByClassName("heading-anchor")
    for(var i = 0; i < anchors.length; i++){
        anchors[i].href = "javascript: void(0)"
        // console.log(anchors[i].parentElement)
        // console.log(anchors[i].parentNode)
        anchors[i].parentElement.addEventListener("click", function(){
            highlightingListener(this.parentElement)
        })
    }


    // //If this is the printing page, I don't want to add checkmarks
    // var printingPage = document.getElementById("printPage")
    // if(printingPage){
    //     return
    // }

    // Get the wrapper that contains all of our class stuff
    // var wrapper = document.getElementById("content-wrapper")
    // if(!wrapper){
    //     console.log("wrapper is null")
    //     return
    // }

    // //Go through each div in the class and add a print checkbox
    // var nodes = wrapper.getElementsByTagName("div");
    // for(var i = 0; i < nodes.length; i++){
    //     if(nodes[i].firstElementChild.tagName == "H1" || nodes[i].firstElementChild.tagName == "H2" || nodes[i].classList.contains("") || checkFeats(nodes[i])){
    //         continue
    //     }
    //     var checkbox = document.createElement('input')
    //     checkbox.type = "checkbox"
    //     checkbox.name = "toPrint"
    //     checkbox.className ="toPrintCheckbox"
    //     //Insert the checbox right after the heading
    //     nodes[i].insertBefore(checkbox, nodes[i].children[1])
    // }

}

document.addEventListener("DOMContentLoaded", function() {
    addPrintBehavior()
  })