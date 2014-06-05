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
    user = user[0]; // weil die datenbank ein array rausgibt & wir nur das erste element brauchen

    if('undefined' !== typeof user){

        console.log(user);

        var gameObject = user.gameobject;
        var userType = gameObject.type;

        if(userType == 0){ // farmer

            $('#game').append('<h1>Farmer</h1>');
            $('#game').append('<h1>MONIEEEES: ' + gameObject.money +  '</h1>');

            for(var i = 0; i < gameObject.fields.length; i++){
                var field = gameObject.fields[i];

                /** hier die einzelnen felder an das 'game'-div attachen **/
                console.log(field);

                $('#game').append('<div id="game_feld" fieldID="'+ i +'">Hello</div>');
                var addedField = $("#game_feld[fieldID='"+i+"']");
                addedField.css('height', addedField.width());
            }
        }else if(userType == 1){ // röster

        }

        /** replace the gameobject of the user in the database **/
        Benutzer.update(user._id, {$set: { gameobject: gameObject } });
    }
};