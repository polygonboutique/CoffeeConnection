/**
* author: Sergej.
 *
 * User DB Layout:
 *
 *
 * user : {
 *     name : "",
 *     pw : "",
 *     email : "",
 *     id : "",
 *     gameobject : {
 *         money : "",
 *         coffee : "",
 *         type : "",
 *         fields : [
 *              {
 *                  status : "",
 *                  type : {
 *                      ertrag : "",
 *                      dauer_bis_ertrag : "",
 *                      cost : ""
 *                  }
 *              }
 *         ]
 *     }
 * }
 *
 *
**/

Template.register.created = function(){
    pageList.addPage('#tpl_register');
};

Template.register.events({
    'click #register_register': function (e, tpl) {
        if(AmplifiedSession.get("user") == null){
            var username = tpl.find('#register_username').value;
            var email = tpl.find('#register_email').value;
            var password = tpl.find('#register_password').value;
            var repeatPassword = tpl.find('#register_repeatpassword').value;
            var userType = tpl.find('#register_type').value;

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
                            $('#register_error').text("success!");

                            Benutzer.insert({
                                id : new Date().getTime().toString().substr(4), // this is a hack -> http://stackoverflow.com/questions/15886833/how-can-i-create-an-auto-increment-field-on-meteor
                                name : username,
                                email : email,
                                password : password,
                                gameobject : {
                                    type : userType,
                                    money : 0,
                                    coffee: 0,
                                    fields : [
                                        {
                                            id : 0,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 1,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 2,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 3,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 4,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 5,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 6,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 7,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 8,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 9,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 10,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 11,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 12,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 13,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 14,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        },
                                        {
                                            id : 15,
                                            status : 0,
                                            type : {
                                                harvest : 0,
                                                time : 0,
                                                cost : 0
                                            }
                                        }
                                    ]
                                }
                            });

                            window.location.reload();

                        }else{
                            $('#register_error').text(register.errorEMailAlreadyExsits());
                        }
                    }else{
                        $('#register_error').text(register.errorUserAlreadyExsits());
                    }

                }else{
                    $('#register_error').text(register.errorPasswordsDoNotMatch());
                }

            }else{
                $('#register_error').text(register.errorDataIncomplete());
            }
        }else{
            $('#register_error').text(function(){
                console.log(AmplifiedSession.get("user"));
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