/**
 * author: Sergej.
 **/

Template.gameContent.created = function(){
    pageList.addPage('#tpl_gameContent');
};

Template.gameContent.rendered = function(){
    console.log("Gamecontent Template height: " + $('#tpl_gameContent').height());
    // $('#tpl_gameContent').css('height', $('#tpl_gameContent').height());
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

                $('#game').append('<div id="game_feld" fieldID="'+ i +'" onclick="stepGame()" ></div>');
                var addedField = $("#game_feld[fieldID='"+i+"']");
                addedField.css('height', addedField.width());

                if(i % 4 == 0) {
                    addedField.css('margin-left', '12.5%');
                    addedField.css('clear', 'both');
                }
            }
            $('#game').append('<div id="game_panel"></div>');

            //var harvest = "'harvest'";
            $('#game_panel').append('<div class="game_panel_icon" onclick="changeCurrentAction('+"'harvest'"+')">Harvest</div>');
            $('#game_panel').append('<div class="game_panel_icon" onclick="changeCurrentAction('+"'plant'"+')">Plant</div>');
            $('#game_panel').append('<div class="game_panel_icon" onclick="changeCurrentAction('+"'other'"+')">Other</div>');


        }else if(userType == 1){ // röster

        }

        /** replace the gameobject of the user in the database with the updated version **/
        Benutzer.update(user._id, {$set: { gameobject: gameObject } });
    }
};

/**
 * Game
 * **/


/**
 * Actions = { plant, harvest }
 * **/

//global
currentAction = "harvest";

stepGame = function(){
    if(currentAction == "harvest"){
        alert(currentAction);
    }
};

changeCurrentAction = function(action){
    currentAction = action;
    alert(currentAction);
};