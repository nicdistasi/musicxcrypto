var cursorElem = document.getElementById('cursor');
var mainElem = document.getElementById('main');
var variaText = document.getElementById('varying');


var start = Date.now();
//text update counter
var textCounter = setInterval(function() {
    const charWidth = 30
    var maxWidth = parseInt(mainElem.offsetWidth - 144);
    var charCombo = "";
    var comboLength = 0;
    while (comboLength <= maxWidth-30) {
        var x = Math.random()*3;
        if (x < 1) {
            charCombo +='X';
            comboLength+=30;
        } else if (x <= 2) {
            charCombo +='Y';
            comboLength+=30;
        } else {
            charCombo +='Z';
            comboLength+=30;
        }
    }
    variaText.innerHTML = charCombo;
    
}, 100);


window.addEventListener('mousemove', (e) => {
    cursorElem.style.left = (e.pageX -15)+'px';
    cursorElem.style.top = (e.pageY -15)+'px';
});