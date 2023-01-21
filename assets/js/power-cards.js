//Checks if the passed in element is a feat element
function checkFeats(siblingNode){
    if(!siblingNode){
        return false
    }
    if(siblingNode.classList.contains("adventurer-feat") || siblingNode.classList.contains("champion-feat") || siblingNode.classList.contains("epic-feat")){
        return true
    }
    return false
}

//Gathers all the highlighted text and sends them and the user to the print page
function powerPrint() {
    var checkedBoxes = document.getElementsByClassName("printHighlight");
    //Clear the local storage so we don't get duplicate cards
    localStorage.clear()


    //Gets every highlighted div, and converts them into power cards
    //They must be in string format in order to properly store them in localStorage
    var cards = ""
    for(var i = 0; i < checkedBoxes.length; i++){
        var currentNode = checkedBoxes[i].parentNode
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
    }

    localStorage.setItem("cardsToPrint", cards)
    window.open("../assets/html/printing_identification.html", '_blank');     
}

//Highlights heading if clicked
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

//Turns off hyperlinks in anchors to prevent accidental button presses
//Navigation.js was almost untouched, because it only had to do with sidebar
//needsScroll(elm) was commented out as it required the anchor functionality
function addPrintBehavior(){
    var anchors = document.getElementsByClassName("heading-anchor")
    for(var i = 0; i < anchors.length; i++){
        anchors[i].href = "javascript: void(0)"
        //Checks if next element is a div, and therefore this div had no content
        //Therefore it should not be highlightable
        if(anchors[i].parentElement.nextElementSibling.tagName === "DIV"){
            continue
        }
        anchors[i].parentElement.addEventListener("click", function(){
            highlightingListener(this.parentElement)
        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
    addPrintBehavior()
})
