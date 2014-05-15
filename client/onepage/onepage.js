/**
 * author: Sergej.
 */

Template.onepage.rendered = function(){
    var list = pageList.list; // pagelist ready
    console.log(pageList.list);

    for(var index = 0; index < list.length; index++)
    {

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
    }
};

Template.onepage.isLoggedIn = function () {
    return AmplifiedSession.get("user") != null;
};

Template.onepage.notLoggedIn = function () {
    return AmplifiedSession.get("user") == null;
};

