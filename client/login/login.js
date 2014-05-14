/**
 * author: Sergej.
 */

Template.login.rendered = function(){
    if(AmplifiedSession.get("user") != null){
        $("#login").remove();
    }
};

Template.login.created = function(){
    pageList.addPage("#tpl_login");
};

Template.login.events({
    /** Login code **/
    'click #login': function (e, tpl) {

        var email = tpl.find('#login_email').value;
        var password = tpl.find('#login_password').value;

        var user = Benutzer.find({"email" : email}).fetch();
        user = user[0];

        console.log(user);
        console.log(password + " - " + user.id);

        if(user.password === password){
            AmplifiedSession.set("user", user);
            console.log(AmplifiedSession.get("user"));
            window.location.reload();
        }

    }
});