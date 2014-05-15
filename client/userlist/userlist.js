/**
* author: Sergej.
**/
Template.userlist.events({
    /** Logout code **/
    'click #ID': function (e, tpl) {}
});

Template.userlist.user = function () {
    return Benutzer.find({});
};

Template.userlist.created = function(){
    pageList.addPage('#tpl_userList');
};