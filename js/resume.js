/**
 * Created by Steve on 8/24/14.
 */
var COLOR_ICON_GRAY = "#777777";
var COLOR_LINK = "#428bca";

var TIME_MS_ICON_ANIMATE = "50";
var TIME_MS_FADEIN_BODY = 500;

$( document ).ready(function() {

    $(".js .container").fadeIn(TIME_MS_FADEIN_BODY);

    $(".no-link").hover(
        function() {
            $(this)
                .clearQueue()
                .css('color',COLOR_LINK)
                .animate({'color': COLOR_ICON_GRAY}, TIME_MS_ICON_ANIMATE);
        },
        function() {
            $(this)
                .animate({'color': COLOR_LINK}, TIME_MS_ICON_ANIMATE);
        }
    );
    $(window).scroll(function() {
        var pos = $(window).scrollTop();
        var cur_width = $(".container").css('width');
        var dumb=0;
        if (pos > 30 && cur_width == '970px') {
            $(".row-nav").css({
                "position": "fixed",
                "top":    "0",
                "width":    "966px",
                "margin-bottom":    "55px"
            });
            $("#aftermenuspace").css({
                "height":    "55px"
            });
        } else {
            $(".row-nav").css({
                "position": "initial",
                "margin-bottom":    "0",
                "width":    "initial"
            });
            $("#aftermenuspace").css({
                "height":    "0"
            });
        }
    });
});


