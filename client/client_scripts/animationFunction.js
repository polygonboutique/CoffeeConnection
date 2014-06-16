var indexId = 0;
var currentGif = 0;

spawnAnimation = function(className, offset, animationTime){
//    var randomID =  (new Date()).getTime(); //Replaced by individualId -> more reliable
    indexId = indexId + 1;
    var uniqueId = indexId;
//    console.log(uniqueId);
    $("#game").append("<div id='"+uniqueId+"' class='"+className+"'></div>");
    $('#' + uniqueId).css('top', getMousePosition().y - offset);
    $('#' + uniqueId).css('left', getMousePosition().x - offset);

    var srcPath;
    if(currentGif == 0)
    {
        srcPath = "/img/BeanJumpRight_Once3.gif";
        currentGif = currentGif + 1;
    }
    else
    {
        if(currentGif == 1)
        {
            srcPath = "/img/BeanJumpLeft_Once3.gif";
            currentGif = currentGif + 1;
        }
        else
        {
            srcPath = "/img/BeanJumpMiddle_Once3.gif";
            currentGif = 0;
        }
    }

    $('#' + uniqueId).append('<img id="theAnimation'+uniqueId+'" src="'+srcPath+'">');
    $('#theAnimation' + uniqueId).attr('src', '');
    $('#theAnimation' + uniqueId).attr('src', srcPath);

    spawnTimer(function(){
        $('#' + uniqueId).remove();
    }, animationTime);
};