Template.logout.events({
    /** Logout code **/
    'click #logout': function (e, tpl) {

        Session.set("user", null);
        alert("Session destroyed");

    }
});