 var g_height = $(window).height();
 var g_width = $(window).width();

 $(window).resize(function() {

     var windowIsSmaller = false;

     if(g_height > $(window).height() || g_width > $(window).width()){
        windowIsSmaller = true;
     }

     g_height = $(window).height();
     g_width = $(window).width();

     var minMargin = -0.004;
     var maxMargin = 0.03;

     if(AmplifiedSession.get("user") != null){

         for(var i = 0; i < 16; i++){
             var addedField = $("#game_feld[fieldID='"+i+"']");

             // margin kleiner
             if($(window).width() > (screen.width * 0.60)){
             //  margin-left: -2.4%;
                 addedField.css('width', screen.width * 0.125);
                 addedField.css('height', screen.width * 0.125);

                 var fieldMargin = addedField.css('margin-left');
                 var fieldMarginPercent = parseFloat(fieldMargin) / $(window).width();

                 if(i % 4 == 0){
                     addedField.css('margin-left', '12.5%');
                 }else{
                     //addedField.css('margin-left', '-2.4%');


                     // wenn fenster kleiner wird
                     if(windowIsSmaller){
                     if(fieldMarginPercent > minMargin){

                     if($(window).width() >= (screen.width * 0.90)){
                         addedField.css('margin-left', '3%')
                     }else{
                        var newMargin = (fieldMarginPercent - 0.004) * 100;
                        addedField.css('margin-left', newMargin + '%');
                        }
                     }
                     }else{
                     if($(window).width() == (screen.width - 10)){
                     addedField.css('margin-left', '3%');
                     }else{
                     if(fieldMarginPercent < maxMargin){
                     var newMargin = (fieldMarginPercent + 0.004) * 100;
                     addedField.css('margin-left', newMargin + '%');
                     }
                     }
                     }

                 }


                 }else{
                 // alle 16 felder neu skalieren
                    console.log("Felder skalieren!");
                 if(i % 4 == 0){
                     addedField.css('margin-left', '12.5%');
                 }else{
                    addedField.css('margin-left', '-2.4%');
                 }

                 addedField.css('width', $(window).width() * 0.15);
                 addedField.css('height', $(window).width() * 0.15);
             }
         }
     }
 });
