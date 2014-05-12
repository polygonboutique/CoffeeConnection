Template.logout.rendered = function(){
    if(AmplifiedSession.get("user") == null){
        $("#logout").remove();
    }
};

Template.logout.created = function(){

};

Template.logout.events({
    /** Logout code **/
    'click #logout': function (e, tpl) {
        AmplifiedSession.set("user", null);
        window.location.reload();
    }
});