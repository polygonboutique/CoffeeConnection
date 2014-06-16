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
    if(logic == false){
        var userMail = AmplifiedSession.get("user").email;
        var user = Benutzer.find({"email" : userMail}).fetch();
        user = user[0]; // weil die datenbank ein array rausgibt & wir nur das erste element brauchen

        if('undefined' !== typeof user){

            console.log(user);

            var gameObject = user.gameobject;
            var userType = gameObject.type;

            if(userType == 0){ // farmer

                for(var i = 0; i < gameObject.fields.length; i++){
                    var field = gameObject.fields[i];

                    /** hier die einzelnen felder an das 'game'-div attachen **/
                    console.log(field);

                    var content = "";

                    $('#game').append('<div id="game_feld" class="game_feld_background" fieldID="'+ i +'" onclick="stepGame('+i+')" >'+content+'</div>');
                    var addedField = $("#game_feld[fieldID='"+i+"']");
                    addedField.css('height', addedField.width());

                    var feldStatus = "";

                    /**
                     * Wenn Felder in einem niedrigen Status sind, dann Funktion zum 'reifen' aufrufen.
                     * Ansich sollte die Zeit der Erstellung der Plfanze in der DB gespeichert werden!
                     * **/
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
                        addedField.css('margin-left', '14%');
                        addedField.css('clear', 'both');
                    }
                }
                $('#game').append('<div id="game_panel"></div>');

                //var harvest = "'harvest'";
                $('#game_panel').append('<div id="harvest" class="game_panel_icon" onclick="changeCurrentAction('+"'harvest'"+')"><div class="harvest_icon"></div></div>');
                $('#game_panel').append('<div id="plant" class="game_panel_icon" onclick="changeCurrentAction('+"'plant'"+')"><div class="plant_icon"></div></div>');
                $('#game_panel').append('<div id="delete" class="game_panel_icon" onclick="changeCurrentAction('+"'delete'"+')"><div class="shovel_icon"></div></div>');
                $('#game_panel').append('<div class="game_panel_icon" onclick="changeCurrentAction('+"'other'"+')">Other</div>');

            }else if(userType == 1){ // röster
                for(var i = 0; i < gameObject.fields.length; i++){
                    var field = gameObject.fields[i];

                    var content = "";

                    $('#game').append('<div id="game_feld" fieldID="'+ i +'" onclick="stepGame('+i+')" >'+content+'</div>');
                    var addedField = $("#game_feld[fieldID='"+i+"']");
                    addedField.css('height', addedField.width());

                    var feldStatus = "";

                    /**
                     * Wenn Felder in einem niedrigen Status sind, dann Funktion zum 'reifen' aufrufen.
                     * Ansich sollte die Zeit der Erstellung der Plfanze in der DB gespeichert werden!
                     * **/
                    if(field.status == 0){
                        feldStatus = "game_roast_empty";
                    }else if(field.status == 1){
                        feldStatus = "game_roast_state1";
                    }else if(field.status == 2){
                        feldStatus = "game_roast_state2";
                    }else if(field.status == 3){
                        feldStatus = "game_roast_state3";
                    }

                    addedField.addClass(feldStatus);

                    if(i % 4 == 0) {
                        addedField.css('margin-left', '14%');
                        addedField.css('clear', 'both');
                    }
                }

                /** icon panel **/
                $('#game').append('<div id="game_panel" class="game_panel_roeste"></div>');
                $('#game_panel').append('<div id="harvest" class="game_panel_icon" onclick="changeCurrentAction('+"'harvest'"+')"><div class="hand_icon"></div></div>');
                $('#game_panel').append('<div id="plant" class="game_panel_icon" onclick="changeCurrentAction('+"'plant'"+')"><div class="build_icon"></div></div>');
                $('#game_panel').append('<div id="delete" class="game_panel_icon" onclick="changeCurrentAction('+"'delete'"+')"><div class="wreck_icon"></div></div>');
                $('#game_panel').append('<div class="game_panel_icon" onclick="changeCurrentAction('+"'other'"+')">Other</div>');

                $('#tpl_gameContent').addClass('game_roeste_background');
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
currentAction = "none";
logic = false;
harvestBeansAmount = 3; // sollte demnächst in der datenbank stehen, damit das mit perks aufwerten kann
actionArray = ["harvest", "plant", "delete"];

stepGame = function(id){
    var userMail = AmplifiedSession.get("user").email;
    var user = Benutzer.find({"email" : userMail}).fetch();
    user = user[0];

    var gameObject = user.gameobject;
    var field = gameObject.fields[id];

    if(currentAction == "harvest"){

        if(field.status == 3){
            gameObject = harvestBeans(field, id, gameObject);

            /** hier animation abspielen, bzw. nen div spawnen lassen **/
            spawnAnimation("animation_bean", 64, 500);
        }

    }else if(currentAction == "plant"){
        if(field.status == 0){
            field.status = 1;

            var addedField = $("#game_feld[fieldID='"+id+"']");
            addedField.removeClass();

            if(gameObject.type == 0){ // farmer
                addedField.addClass("game_feld_background");
                addedField.addClass("game_feld_planted");
            }else{
                addedField.addClass("game_roast_state1");
            }


            spawnTimer(function(){

                /** get the recent gameobject from the db and modify it! **/
                var userMail = AmplifiedSession.get("user").email;
                var user = Benutzer.find({"email" : userMail}).fetch();
                user = user[0];
                var gameObject = user.gameobject;
                var field = gameObject.fields[id];
                field.status = 2;

                var addedField = $("#game_feld[fieldID='"+id+"']");
                addedField.removeClass();

                if(gameObject.type == 0){ // farmer
                    addedField.addClass("game_feld_background");
                    addedField.addClass("game_feld_grown");
                }else{
                    addedField.addClass("game_roast_state2");
                }

                Benutzer.update(user._id, {$set: { gameobject: gameObject } });

                /** change plant to be ready **/
                spawnTimer(function(){
                    /** get the recent gameobject from the db and modify it! **/
                    var userMail = AmplifiedSession.get("user").email;
                    var user = Benutzer.find({"email" : userMail}).fetch();
                    user = user[0];
                    var gameObject = user.gameobject;
                    var field = gameObject.fields[id];
                    field.status = 3;

                    /** anzahl der bohnen kann von sorte zu sorte variieren **/
                    field.beans = 100;

                    var addedField = $("#game_feld[fieldID='"+id+"']");
                    addedField.removeClass();

                    if(gameObject.type == 0){ // farmer
                        addedField.addClass("game_feld_background");
                        addedField.addClass("game_feld_harvest");
                    }else{
                        addedField.addClass("game_roast_state3");
                    }

                    Benutzer.update(user._id, {$set: { gameobject: gameObject } });
                }, 800);

            }, 800);
        }
    }else if(currentAction == "delete"){
        field.status = 0;
        var addedField = $("#game_feld[fieldID='"+id+"']");
        addedField.removeClass();

        if(gameObject.type == 0){ // farmer
            addedField.addClass("game_feld_background");
            addedField.addClass("game_feld_empty");
        }else{
            addedField.addClass("game_roast_empty");
        }

    }

    /** push changes back to database **/
    Benutzer.update(user._id, {$set: { gameobject: gameObject } });
};

changeCurrentAction = function(action){

    for(var i = 0; i < actionArray.length; i++){
        if(actionArray[i] === action){
            $('#' + actionArray[i]).addClass('active_icon');
        }else{
            $('#' + actionArray[i]).removeClass('active_icon');
        }
    }

    currentAction = action;
    console.log("Changed current Action to: " + currentAction);
    var horn = document.getElementsByTagName("audio")[0];
    horn.play();
};


spawnTimer = function(f, timeout){
    window.setTimeout(f, timeout);
};

startLoop = function(user){
    // Alle 200 Zeiteinheiten wird die Datenbank neu beschrieben!
    window.setInterval(function(){
        Benutzer.update(user._id, {$set: { gameobject: gameObject } });
    }, 200);
};

harvestBeans = function(field, fieldID, gameObject){

    var fieldBeansAmount = field.beans;

    if(fieldBeansAmount < harvestBeansAmount){
        field.beans = 0;
        field.status = 0;
        gameObject.coffee = gameObject.coffee + fieldBeansAmount;
    }else{
        field.beans = field.beans - harvestBeansAmount;
        gameObject.coffee = gameObject.coffee + harvestBeansAmount;
    }

    /** feld nachwachsen lassen! **/
    if(field.beans == 0){
        field.status = 2;
        var addedField = $("#game_feld[fieldID='"+fieldID+"']");
        addedField.removeClass();

        if(gameObject.type == 0){
            addedField.addClass("game_feld_background");
            addedField.addClass("game_feld_grown");
        }else{
            addedField.addClass("game_roast_state2"); // TODO: hier auf _empty setzen
        }

        /** change plant to be ready **/
        if(gameObject.type == 0){ // farmer
            spawnTimer(function(){
                /** get the recent gameobject from the db and modify it! **/
                var userMail = AmplifiedSession.get("user").email;
                var user = Benutzer.find({"email" : userMail}).fetch();
                user = user[0];

                var gameObject = user.gameobject;
                var field = gameObject.fields[fieldID];
                field.status = 3;

                /** anzahl der bohnen kann von sorte zu sorte variieren **/
                field.beans = 100;

                var addedField = $("#game_feld[fieldID='"+fieldID+"']");
                addedField.removeClass();

                    addedField.addClass("game_feld_background");
                    addedField.addClass("game_feld_harvest");


                Benutzer.update(user._id, {$set: { gameobject: gameObject } });
            }, 5000);
        }
    }

    return gameObject;
};