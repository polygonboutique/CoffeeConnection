spawnAnimation = function(className, offset, animationTime){
    var randomID =  (new Date()).getTime();
    $("#game").append("<div id='"+randomID+"' class='"+className+"'></div>");
    $('#' + randomID).css('top', getMousePosition().y - offset);
    $('#' + randomID).css('left', getMousePosition().x - offset);

    $('#' + randomID).append('<img src="/img/BeanJumpRight_Endless.gif" width="100%" height="100%">');

    spawnTimer(function(){
        $('#' + randomID).remove();
    }, animationTime);
};