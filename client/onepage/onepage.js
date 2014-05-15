/**
 * author: Sergej.
 */

Template.onepage.rendered = function(){
    var list = pageList.list; // pagelist ready
    console.log(pageList.list);

/*    var butDwnP1 = "<a href='#' onclick='$('";
    var butDwnP2 = "').goTo()'><div id='arr_btn_dwn'></div></a>";*/

    for(var index = 0; index < list.length; index++)
    {
/*        var butDwnString = butDwnP1 + list[index + 1] + butDwnP2;
        $(list[index]).append(butDwnString);
        console.log(butDwnString);*/


        //"undefined"==typeof jQuery
        if(typeof list[index + 1] !== 'undefined'){
            var onclickString = "$('" + list[index + 1] + "').goTo()";
            var appendString = "<a href='#' onclick=" + onclickString + "> <div id='arr_btn_dwn'></div> </a>";
            $(appendString).insertAfter(list[index]);
        }

        if(typeof list[index - 1] !== 'undefined'){
            var onclickString = "$('" + list[index - 1] + "').goTo()";
            var prependString = "<a href='#' onclick=" + onclickString + "> <div id='arr_btn_up'></div> </a>";
            $(prependString).insertBefore(list[index]);
        }

        console.log(appendString);


        console.log(list[index]);

    }
    /*
    * [0] -> [1]
    * [0] <- [1] -> [2]
    * [1] <- [2] -> [3]
    * */
};

Template.onepage.isLoggedIn = function () {
    return AmplifiedSession.get("user") != null;
};

Template.onepage.notLoggedIn = function () {
    return AmplifiedSession.get("user") == null;
};

