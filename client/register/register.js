
Template.register.events({
    'click #register': function (e, tpl) {
        if(Session.get("user") == null){
            var username = tpl.find('#username').value;
            var email = tpl.find('#email').value;
            var password = tpl.find('#password').value;
            var repeatPassword = tpl.find('#repeatpassword').value;

            var register = new Register();

            /** check if user is logged in **/
            // -> wenn logged in, keine registrierung möglich & er sollte diese page überhaupt nciht sehen


            if((username.length + email.length + password.length + repeatPassword.length) > 0){
                if(password === repeatPassword){

                    var dbUserName = Benutzer.find({"name" : username}).fetch();
                    var dbUserMail = Benutzer.find({"email" : email}).fetch();

                    console.log(dbUserName);
                    //console.log(Benutzer.find({"name" : username}).fetch()); //[0].

                    if(dbUserName.length <= 0){
                        if(dbUserMail.length <= 0){
                            /***
                             * Hier den Eintrag in die DB machen
                             * **/
                            $('#error').text("success!");

                            Benutzer.insert({
                                id : new Date().getTime().toString().substr(4), // this is a hack -> http://stackoverflow.com/questions/15886833/how-can-i-create-an-auto-increment-field-on-meteor
                                name : username,
                                email : email,
                                password : password,
                                gameobject : 0
                            });

                            window.location.reload();

                        }else{
                            $('#error').text(register.errorEMailAlreadyExsits());
                        }
                    }else{
                        $('#error').text(register.errorUserAlreadyExsits());
                    }

                }else{
                    $('#error').text(register.errorPasswordsDoNotMatch());
                }

            }else{
                $('#error').text(register.errorDataIncomplete());
            }
        }else{
            $('#error').text(function(){
                console.log(Session.get("user"));
                return "You are already logged in !";
            });
        }
    }
});

/**
 * Klasse für Fehlermeldungen
 * **/

var Register = function(){};

Register.prototype.displayError = function(){
    return "Error";
};

Register.prototype.errorDataIncomplete = function(){
    return "es wurden nicht alle felder ausgefüllt!";
};

Register.prototype.errorPasswordsDoNotMatch = function(){
    return "passwörter stimmen nicht überein!";
};

Register.prototype.errorNewUserRegistered = function(){
    return "neues benutzerkonto angelegt!";
};

Register.prototype.errorUserAlreadyExsits = function(){
    return "user existiert bereits!";
};

Register.prototype.errorEMailAlreadyExsits = function(){
    return "email existiert bereits!";
};