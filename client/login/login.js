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

        var login = new Login();

        if((email.length + password.length) <= 0){
            $('#login_error').text(login.errorDataIncomplete());
        }else{
            var user = Benutzer.find({"email" : email}).fetch();
            user = user[0];

            if('undefined' !== typeof user){
                if(user.password === password){
                    AmplifiedSession.set("user", user);
                    console.log(AmplifiedSession.get("user"));
                    window.location.reload();
                }else{
                    $('#login_error').text(login.errorPasswordsDoNotMatch());
                    $('#login_error').addClass('alert alert-danger');
                }
            }else{
                $('#login_error').text(login.errorEmailNotFound());
            }
        }
    }
});

/**
 * Klasse für Fehlermeldungen
 * **/

var Login = function(){};

Login.prototype.displayError = function(){
    return "Error";
};

Login.prototype.errorDataIncomplete = function(){
    return "es wurden nicht alle felder ausgefüllt!";
};

Login.prototype.errorEmailNotFound = function(){
    return "email existiert nicht!";
};

Login.prototype.errorPasswordsDoNotMatch = function(){
    return "passwörter stimmen nicht überein!";
};