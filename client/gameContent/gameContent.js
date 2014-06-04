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
    }
};