/**
* author: Sergej.
**/
Template.userStats.showProfile = function () {
    return [AmplifiedSession.get("user")];
};

Template.userStats.showProfileYo = function () {
    return AmplifiedSession.get("user");
};

Template.userStats.created = function(){
    pageList.addPage('#tpl_userStats');
};