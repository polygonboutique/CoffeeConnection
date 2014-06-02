/**
 * author: Sergej.
 */

Template.onepage.rendered = function(){
    var list = pageList.list; // pagelist ready
    console.log(pageList.list);
};

Template.onepage.isLoggedIn = function () {
    return AmplifiedSession.get("user") != null;
};

Template.onepage.notLoggedIn = function () {
    return AmplifiedSession.get("user") == null;
};

