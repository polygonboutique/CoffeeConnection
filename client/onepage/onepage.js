/**
 * author: Sergej.
 */

Template.onepage.rendered = function(){
    var list = pageList.list; // pagelist ready
    console.log(pageList.list);

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

