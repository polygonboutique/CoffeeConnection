Template.login.rendered = function(){
/*    if(Session.get("user")){
        $("#login").remove();
        alert("remove!");
    }*/
    console.log(Session.get("user"));


};

Template.login.events({
    /** Login code **/
    'click #login': function (e, tpl) {

        var email = tpl.find('#email').value;
        var password = tpl.find('#password').value;

        var user = Benutzer.find({"email" : email}).fetch();
        user = user[0];

        console.log(user);
        console.log(password + " - " + user.id);

        if(user.password === password){
            Session.set("user", user);
            console.log(Session.get("user"));
           // window.location.reload();
        }

    }
});