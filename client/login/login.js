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

        password = hashAndSalt(password);

        if(email.length <= 0 || password.length <= 0){
            $('#login_error').html(login.errorDataIncomplete());
            $('#login_error').addClass('alert alert-danger');
        }else{
            var user = Benutzer.find({"email" : email}).fetch();
            user = user[0];

            if('undefined' !== typeof user){
                if(user.password === password){
                    AmplifiedSession.set("user", user);
                    console.log(AmplifiedSession.get("user"));
                    window.location.reload();
                }else{
                    $('#login_error').html(login.errorPasswordsDoNotMatch());
                    $('#login_error').addClass('alert alert-danger');
                }
            }else{
                $('#login_error').html(login.errorEmailNotFound());
                $('#login_error').addClass('alert alert-danger');
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
    return "<b>Dare you!</b> Please fill out all fields.";
};

Login.prototype.errorEmailNotFound = function(){
    return "<b>Fail!</b> The Email was not found.";
};

Login.prototype.errorPasswordsDoNotMatch = function(){
    return "<b>Password does not match!</b> Please try again.";
};