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


checkPositionAndScroll = function(button){
    var list = pageList.list; // pagelist ready

    var currentPosition =  $(window).scrollTop() + ($(window).height() / 2);
    var currentPositionUp =  $(window).scrollTop() - ($(window).height() / 2);
    console.log("current pos: " + currentPosition);

    var scrollToElement = null;

    if(button == 'down'){
        for(var i = 0; i < list.length; i++){
            var elementPosition = $(list[i]).position().top;
                if(elementPosition >= currentPosition){
                    scrollToElement = list[i];
                    if(i + 1 >= list.length){
                        console.log("DEACTIVATE BOTTOM BUTTON");
                        $("#main_arrow_down").hide();
                    }else{
                        $("#main_arrow_up").show();
                    }
                    break;
                }
        }
    }else if(button == 'up'){

        for(var i = 0; i < list.length; i++){
            var j = Math.abs((i - list.length) + 1); // weil javascript komisch ist
            var elementPosition = $(list[j]).position().top;

            if(elementPosition <= currentPositionUp){
                scrollToElement = list[j];
                if(j <= 0){
                    console.log("DEACTIVATE TOP BUTTON");
                    $("#main_arrow_up").hide();
                }else{
                    console.log("show top button");
                   // $("#main_arrow_up").show();
                    $("#main_arrow_down").show();
                    // $("#main_arrow_up").css("display", "visible");
                }
                break;
            }
        }
    }else if(button == 'none'){
        //check only buttons!
    }

    // scroll to
    console.log("scroll to element : " + scrollToElement);
    $(scrollToElement).goTo();

    /** buttons an & aus machen! **/

  }