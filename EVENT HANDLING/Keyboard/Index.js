window.onkeyup = processKeyUp;
window.onkeydown = processKeyDown;

function processKeyUp(evt){
    var keys = document.querySelector("#keys");
    key.innerHTML += "keyup: " + evt.key + " code: " + evt.keyCode + "<br>";
}

function processKeyDown(evt){
    var keys = document.querySelector("#keys");
    keys.innerHTML += "keydown: " + evt.key + " code: " + evt.keyCode + "<br>";
}
