/**
 * author: Sergej.
 **/

Template.gameContent.created = function(){
    pageList.addPage('#tpl_gameContent');
};

Template.gameContent.rendered = function(){
};

Template.gameContent.events({

});

Template.gameContent.logic = function () {
    var userMail = AmplifiedSession.get("user").email;
    var user = Benutzer.find({"email" : userMail}).fetch();
    user = user[0];

    if('undefined' !== typeof user){

        /*    // user2 -> ist der richtige
         var user2 = Benutzer.find({"email" : userMail}).fetch();
         user2 = user2[0];*/

        console.log("-------");
        console.log(user);
        console.log(user.gameobject);
        console.log("-------");


        var gameObject = user.gameobject;
        var userType = gameObject.type;

        console.log(userType);

        if(userType == 0){ // farmer

            $('#game').append('<h1>Farmer</h1>');
            $('#game').append('<h1>MONIEEEES: ' + gameObject.money +  '</h1>');

            for(var i = 0; i < gameObject.fields.length; i++){
                var field = gameObject.fields[i];


                console.log(field);


                console.log(field.id + " & " + field.status);

                /** change value **/
                // Polls.update({ _id: id },{ $push: { already_voted: ip })

            }

        }

        /** replace the gameobject of the user in the database **/
        Benutzer.update(user._id, {$set: { gameobject: gameObject } });

    }
};