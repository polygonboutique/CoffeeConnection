/**
 * author: Sergej.
 **/

Template.gameContent.created = function(){
    pageList.addPage('#tpl_gameContent');
};

Template.gameContent.rendered = function(){

    /**
     * hier wird aus der datenbank gelesen, ob der user ein 'farmer' oder ein
     * 'röster' ist
     *  **/


    var gameObject = AmplifiedSession.get("user").gameobject;
    var userType = gameObject.type;

    if(userType == 0){
        /** user ist farmer **/

            // 1. Alle Felder anzeigen
            // 2. Eigenschaften der Felder darstellen

        $('#game').append("<h1>FARMER</h1>");

    }else if(userType == 1){
        /** user ist röster **/
        for(var i = 0; i < 20; i++){
            $('#game').append('<h1>RÖSTER</h1>');
        }
    }
};

Template.gameContent.events({

});