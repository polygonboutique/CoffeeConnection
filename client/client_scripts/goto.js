/**
 * Code from: http://stackoverflow.com/questions/4801655/how-to-go-to-a-specific-element-on-page
 * author: Sergej
 * */
(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'swing');
        return this; // for chaining...
    }
})(jQuery);

(function($) {
    $.fn.goToBottom = function() {
        $('html, body').animate({
            scrollTop: ($(this).offset().top + $(this)[0].scrollHeight - $(window).height()) //$(this)[0].scrollHeight returns the height of the page (this).
        }, 'swing'); //'swing' is the time it takes to scroll (speed), can be replaced by a number.
        return this; // for chaining...
    }
})(jQuery);