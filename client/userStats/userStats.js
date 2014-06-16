/**
* author: Sergej.
**/
var connectionsBuild = false;

Template.userStats.rendered = function(){

    //Cant be used in .rendered!?
//    var userMail = AmplifiedSession.get("user").email;
//    var user = Benutzer.find({"email" : gg}).fetch();
//    user = user[0]; // weil die datenbank ein array rausgibt & wir nur das erste element brauchen
//    var gameObject = user.gameobject;

};

Template.userStats.showProfile = function () {
    return [AmplifiedSession.get("user")];
};

Template.userStats.showProfileYo = function () {
    return AmplifiedSession.get("user");
};

Template.userStats.created = function(){
    pageList.addPage('#tpl_userStats');
};

Template.userStats.events({
    /** Logout code **/
    'click #logout': function (e, tpl) {
        AmplifiedSession.set("user", null);
        window.location.reload();
    },

    'click #addButton': function (e, tpl) {
        var userToAdd = tpl.find('#addField').value;
        if(userToAdd.length > 0 && userToAdd != null && 'undefined' !== typeof userToAdd){

            /**
             * 1. Prüfen ob es so einen Account in der DB gibt
             * 2. Prüfen ob dieser Account schon in den eigenen Connections drinsteht
             * => 1 == true && 2 == false -> dann schicke dem Account eine Freundschaftsanfrage (bzw. Füge diesen direkt als Freund hinzu)
             * */


            var userToAdd =  Benutzer.find({"email" : userToAdd}).fetch();
            userToAdd = userToAdd[0];

            var userMail = AmplifiedSession.get("user").email;
            var currentLoggedInUser = Benutzer.find({"email" : userMail}).fetch();
            currentLoggedInUser = currentLoggedInUser[0]; // weil die datenbank ein array rausgibt & wir nur das erste element brauchen

            var doesUserExistInDB = false;
            var alreadyConnectedWithUser = false;

            /*** check if user exists in DB **/
            if('undefined' !== typeof userToAdd && userToAdd != null){
                doesUserExistInDB = true;
                console.log(userToAdd);
            }

            /** check if users are already connected **/

           // currentLoggedInUser.connections  -> array mit emails
            if('undefined' !== typeof currentLoggedInUser.connections){
                for(var i = 0; i < currentLoggedInUser.connections.length; i++){
                    if(currentLoggedInUser.connections[i] == userToAdd.email){
                        alreadyConnectedWithUser = true;
                    }
                }
            }else{
                currentLoggedInUser.connections = [];
            }

            if('undefined' === typeof userToAdd.connections){
                userToAdd.connections = [];
            }


            if(doesUserExistInDB == true && alreadyConnectedWithUser == false){
                /*
                * Beide User verbinden!
                * **/

                console.log("connecting users ");
                console.log(alreadyConnectedWithUser);

                currentLoggedInUser.connections.push(userToAdd.email);
                userToAdd.connections.push(currentLoggedInUser.email);

                Benutzer.update(currentLoggedInUser._id, {$set: { connections: currentLoggedInUser.connections } });
                Benutzer.update(userToAdd._id, {$set: { connections: userToAdd.connections } });

            }


            /**
             *
             * TODO: Hier Änderungen zurück an Client mittels JavaSCript pushen
             * **/
        }

    }
});

Template.userStats.createConnectionsList = function(){

    var user = Template.userStats.getUserFromDB();
    if('undefined' !== typeof user){

        if(connectionsBuild == false)
            connectionsBuild = true;
        else
            return;

        for (var i = 0; i < user.connections.length; i++)
        {
            // Das ist die E-Mail des Users, mit dem eine Connection aufgebaut worden ist
            var connection = user.connections[i];

            var connectedUser = Benutzer.find({"email" : connection}).fetch();
            connectedUser = connectedUser[0]; // weil die datenbank ein array rausgibt & wir nur das erste element brauchen

            /*
            * Hier anhand der E-Mail den Datenbank eintrag holen und den Namen + 'Avatar' hier anzeigen
            * */

            $('#connectionsList').append('<li class="overflowListItem"><div class="panel panel-default" style="margin: 0px; padding:0px"><div class="panel-heading"><h3 class="panel-title">' + connectedUser.name + '</h3></div><div class="panel-body" style="margin: 0px; padding: 5px;"><img src="/img/MrBean.jpg"></div></div></li>');
        }
    }
    else
    {
//        console.log("user was undefined.");
    }
};

Template.userStats.getUserFromDB = function(){
    var userMail = AmplifiedSession.get("user").email;
    var user = Benutzer.find({"email" : userMail}).fetch();
    user = user[0]; // weil die datenbank ein array rausgibt & wir nur das erste element brauchen

    if('undefined' !== typeof user){
//        console.log("some user stats from getUserFromDB: " + user.name + ", " + user.email + ", " + user.gameobject.money + ", " + user.gameobject.coffee + ", " + user.gameobject.type);
        return user;
    }
    else {
    }
};

Template.userStats.getUserTypeFromDB = function(){
    var user = Template.userStats.getUserFromDB();
    if('undefined' !== typeof user){
//        console.log("some user stats from getUserTypeFromDB: " + user.name + ", " + user.email + ", " + user.gameobject.money + ", " + user.gameobject.coffee + ", " + user.gameobject.type);
        if(user.gameobject.type == 0){
             return "Farmer";
        }
        else{
            return "Roaster";
        }
    }
    else{

    }
}