/**
 * Created by Thomas on 14.05.14.
 * Edit: Sergej
 */

var PageListing = function(){};
PageListing.prototype.list = [];

PageListing.prototype.addPage = function(page)
{
    console.log("push page " + page);
    var i = PageListing.prototype.list.length; // current length
    PageListing.prototype.list[i] = page;
};

PageListing.prototype.resetPageList = function()
{
    PageListing.prototype.list = [];
};

pageList = new PageListing();

//Is needed for detecting current position and scroll target on button press.
checkPositionAndScroll = function(button){
    var list = pageList.list; // pageList ready

    var currentPositionMid =  ($(window).scrollTop() + ($(window).height() / 2));
    var midOfUpperPagePosition =  ($(window).scrollTop() - ($(window).height() / 2));
    var currentPositionBottom =  (($(window).scrollTop()) + ($(window).height()));
    var currentPositionTop =  $(window).scrollTop();
    var scrollToElement = null;

    if(button == 'down'){
        if(currentPositionBottom >= ($(list[list.length - 1]).position().top + $(list[list.length - 1]).height())){
            console.log("Tried to scroll down on last page. checkPositionAndScroll returns.")
            return;
        }
        for(var i = 0; i < list.length; i++){
            var elementPosition = $(list[i]).position().top;
            var elementPositionBottom = ($(list[list.length - 1]).position().top + $(list[list.length - 1]).height());
                if(elementPosition > currentPositionTop){
                    scrollToElement = list[i];
                    break;
                }
        }
        //If no suitable element was found, scrollToElement is == null.
        //Since we are not at the bottom yet, nor there is a page with a top that is below us, we are in the middle of the last page.
        // --> Scroll to the bottom of last page.
        if(scrollToElement == null){
            //No suitable element found. Conclusion: goTo bottom of last page.
            scrollToElement = list[list.length - 1];
            console.log("scroll to bottom of element : " + scrollToElement);
            $(scrollToElement).goToBottom();
        }else{
            //suitable element found. goTo it.
            console.log("scroll to element : " + scrollToElement);
            $(scrollToElement).goTo();
        }
    }

    else if(button == 'up'){
        if(currentPositionTop <= $(list[0]).position().top){
            console.log("Tried to scroll up on first page. checkPositionAndScroll returns.")
            return;
        }
        for(var i = 0; i < list.length; i++){
            var j = Math.abs((i - list.length) + 1); // weil javascript komisch ist
            var elementPosition = $(list[j]).position().top;
            if(elementPosition < currentPositionTop){
                scrollToElement = list[j];
                break;
            }
        }
        // scroll to
        console.log("scroll to element : " + scrollToElement);
        $(scrollToElement).goTo();
    }

    //This is called just once at the loading of the site.
    //Not called on mouse press / arrow button press or scrolling.
    else if(button == 'none'){
        checkPosition();
    }
  }

//Is needed for detection of currentPosition and hiding/showing buttons when scrolling.
checkPosition = function(direction){
//    console.log("checkPosition was called!");
    var list = pageList.list;
//    var currentPositionBottom =  $(window).scrollTop() + ($(window).height() / 2);
//    var currentPositionTop =  $(window).scrollTop() - ($(window).height() / 2);
    var currentPositionBottom =  (($(window).scrollTop()) + ($(window).height()));
    var currentPositionTop =  $(window).scrollTop();

//    console.log("$(window).scrollTop(): " + $(window).scrollTop());
//    console.log("$(window).height(): " + $(window).height());
//    console.log("$(window).scrollTop() + ($(window).height() / 2): " + (($(window).scrollTop()) + ($(window).height())));
//    console.log("$(list[list.length - 1]).position().bottom): " + $(list[list.length - 1]).position().bottom);
//    console.log("currentPositionBottom: " + currentPositionBottom);
//    console.log("currentPositionTop: " + currentPositionTop);
//    console.log("last page bottom .bottom: " + ($(list[list.length - 1]).position().top + $(list[list.length - 1]).height()));
//    console.log("last page bottom .top: " + $(list[list.length - 1]).position().top);

    //Check if the down arrow should be displayed or not.
    if(currentPositionBottom >= ($(list[list.length - 1]).position().top + $(list[list.length - 1]).height())){
        console.log("Tried to scroll down on last page. checkPosition hides down button and returns.")
        $("#main_arrow_down").hide();
        return;
    }
    else{
        $("#main_arrow_down").show();
    }

    //Check if the up arrow should be displayed or not.
    if(currentPositionTop <= $(list[0]).position().top){
        console.log("Tried to scroll up on first page. checkPosition hides up button and returns.")
        $("#main_arrow_up").hide();
        return;
    }
    else{
        $("#main_arrow_up").show();
    }
}