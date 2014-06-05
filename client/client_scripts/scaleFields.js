
$(window).resize(function() {
    if(AmplifiedSession.get("user") != null){
        // alle 16 felder neu skalieren
        for(var i = 0; i < 16; i++){
            var addedField = $("#game_feld[fieldID='"+i+"']");
            addedField.css('height', addedField.width());
        }
    }
});