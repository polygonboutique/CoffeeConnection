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

logic = false;

Template.gameContent.logic = function () {
    if(logic == false){
        var userMail = AmplifiedSession.get("user").email;
        var user = Benutzer.find({"email" : userMail}).fetch();
        user = user[0]; // weil die datenbank ein array rausgibt & wir nur das erste element brauchen

        if('undefined' !== typeof user){

            console.log(user);

            var gameObject = user.gameobject;
            var userType = gameObject.type;

            if(userType == 0){ // farmer

                /*            $('#game').append('<h1>Farmer</h1>');
                 $('#game').append('<h1>MONIEEEES: ' + gameObject.money +  '</h1>');*/

                for(var i = 0; i < gameObject.fields.length; i++){
                    var field = gameObject.fields[i];

                    /** hier die einzelnen felder an das 'game'-div attachen **/
                    console.log(field);

                    var content = "";
                    /*
                     if(i == 0){
                     content = "<img src='https://www.google.de/logos/doodles/2014/honinbo-shusakus-185th-birthday-6002788731453440-hp.gif' width='100%' height='100%'>";
                     }
                     */


                    $('#game').append('<div id="game_feld" class="game_feld_background" fieldID="'+ i +'" onclick="stepGame('+i+')" >'+content+'</div>');
                    var addedField = $("#game_feld[fieldID='"+i+"']");
                    addedField.css('height', addedField.width());

                    var feldStatus = "";

                    if(field.status == 0){
                        feldStatus = "game_feld_empty";
                    }else if(field.status == 1){
                        feldStatus = "game_feld_planted";
                    }else if(field.status == 2){
                        feldStatus = "game_feld_grown";
                    }else if(field.status == 3){
                        feldStatus = "game_feld_harvest";
                    }

                    addedField.addClass(feldStatus);

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
                // $('#game').append("<h1>ROSTER</h1>");
            }

            /** replace the gameobject of the user in the database **/
            Benutzer.update(user._id, {$set: { gameobject: gameObject } });
            logic = true;
        }
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

stepGame = function(id){
    var userMail = AmplifiedSession.get("user").email;
    var user = Benutzer.find({"email" : userMail}).fetch();
    user = user[0];

    var gameObject = user.gameobject;
    var field = gameObject.fields[id];

    if(currentAction == "harvest"){
        //alert(currentAction);
    }else if(currentAction == "plant"){
        if(field.status == 0){
            field.status = 1;

            var addedField = $("#game_feld[fieldID='"+id+"']");
            addedField.removeClass();
            addedField.addClass("game_feld_background");
            addedField.addClass("game_feld_planted");
        }
    }

    /** push changes back to database **/
    Benutzer.update(user._id, {$set: { gameobject: gameObject } });
};

changeCurrentAction = function(action){
    currentAction = action;
    alert(currentAction);
};