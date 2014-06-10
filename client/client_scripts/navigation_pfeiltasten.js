//Executed on arrow button up or down press
//Not executed when scrolling per mousewheel or clicking arrow buttons per mouse.
$(document).keydown(function(event) {
    if(event.keyCode == 40){
        event.preventDefault();
        checkPositionAndScroll('down');
    }else if(event.keyCode == 38){
        event.preventDefault();
        checkPositionAndScroll('up');
    }
});

/** scroll events **/
//http://stackoverflow.com/questions/4326845/how-can-i-determine-the-direction-of-a-jquery-scroll-event
var lastScrollTop = 0;
$(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
        checkPosition('down');
    } else {
        checkPosition('up');
    }
    lastScrollTop = st;
});