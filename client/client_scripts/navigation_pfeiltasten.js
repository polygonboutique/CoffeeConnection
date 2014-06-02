$(document).keydown(function(event) {
    if(event.keyCode == 40){
        checkPositionAndScroll('down');
    }else if(event.keyCode == 38){
        checkPositionAndScroll('up');
    }
});