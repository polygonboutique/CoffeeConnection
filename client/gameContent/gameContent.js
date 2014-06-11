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
                        addedField.css('margin-left', '14%');
                        addedField.css('clear', 'both');
                    }
                }
                $('#game').append('<div id="game_panel"></div>');

                //var harvest = "'harvest'";
                $('#game_panel').append('<div id="harvest" class="harvest_icon" onclick="changeCurrentAction('+"'harvest'"+')"></div>');
                $('#game_panel').append('<div id="plant" class="plant_icon" onclick="changeCurrentAction('+"'plant'"+')"></div>');
                $('#game_panel').append('<div id="delete" class="shovel_icon" onclick="changeCurrentAction('+"'delete'"+')"></div>');
                $('#game_panel').append('<div class="game_panel_icon" onclick="changeCurrentAction('+"'other'"+')">Other</div>');

            }else if(userType == 1){ // röster
                // $('#game').append("<h1>ROSTER</h1>");
            }

            /** replace the gameobject of the user in the database **/
            Benutzer.update(user._id, {$set: { gameobject: gameObject } });

            //startLoop(user);
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
        }

    }else if(currentAction == "plant"){
        if(field.status == 0){
            field.status = 1;

            var addedField = $("#game_feld[fieldID='"+id+"']");
            addedField.removeClass();
            addedField.addClass("game_feld_background");
            addedField.addClass("game_feld_planted");

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
                addedField.addClass("game_feld_background");
                addedField.addClass("game_feld_grown");
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
                    addedField.addClass("game_feld_background");
                    addedField.addClass("game_feld_harvest");
                    Benutzer.update(user._id, {$set: { gameobject: gameObject } });
                }, 400);

            }, 400);
        }
    }else if(currentAction == "delete"){
        field.status = 0;
        var addedField = $("#game_feld[fieldID='"+id+"']");
        addedField.removeClass();
        addedField.addClass("game_feld_background");
        addedField.addClass("game_feld_empty");

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

/*
    if(field.beans == 0){
        var addedField = $("#game_feld[fieldID='"+fieldID+"']");
        addedField.removeClass();
        addedField.addClass("game_feld_background");
        addedField.addClass("game_feld_empty");
    }
*/

    /** feld nachwachsen lassen! **/
    if(field.beans == 0){
        field.status = 2;
        var addedField = $("#game_feld[fieldID='"+fieldID+"']");
        addedField.removeClass();
        addedField.addClass("game_feld_background");
        addedField.addClass("game_feld_grown");

        /** change plant to be ready **/
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
        }, 1000);
    }

    return gameObject;
};