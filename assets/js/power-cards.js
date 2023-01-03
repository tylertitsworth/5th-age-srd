function powerPrint() {
    // alert("TESTING")
    var checkedBoxes = document.querySelectorAll('input[name=toPrint]:checked');
    for(var i = 0; i < checkedBoxes.length; i++){
    console.log(checkedBoxes[i].parentNode.innerText)
    }
}

function createButtons(){
    var wrapper = document.getElementById("content-wrapper")
    if(!wrapper){
        console.log("wrapper is null")
    }

    var nodes = wrapper.getElementsByTagName("div");
    for(var i = 0; i < nodes.length; i++){
        var checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.name = "toPrint"
        checkbox.className ="toPrintCheckbox"
        // nodes[i].appendChild(checkbox)
        nodes[i].insertBefore(checkbox, nodes[i].children[1])
    }

}

document.addEventListener("DOMContentLoaded", function() {
    createButtons()
  })