/**
* author: Sergej.
**/
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