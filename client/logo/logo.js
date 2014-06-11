/**
 * author: Sergej.
 */

Template.logo.created = function(){
    pageList.addPage('#tpl_logo');
};

Template.logo.isLoggedIn = function () {
    return AmplifiedSession.get("user") != null;
};

Template.logo.notLoggedIn = function () {
    return AmplifiedSession.get("user") == null;
};


