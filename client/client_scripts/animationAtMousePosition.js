var mouseX;
var mouseY;

$(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

getMousePosition = function(){
    return {x : mouseX, y : mouseY};
};