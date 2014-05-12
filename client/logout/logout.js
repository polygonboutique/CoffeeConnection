Template.logout.rendered = function(){
    if(Session.get("user") == null){
        $("#logout").remove();
    }
};

Template.logout.created = function(){

};

Template.logout.events({
    /** Logout code **/
    'click #logout': function (e, tpl) {
        Session.set("user", null);
        window.location.reload();
    }
});