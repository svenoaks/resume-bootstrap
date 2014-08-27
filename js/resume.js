/**
 * Created by Steve on 8/24/14.
 */
var COLOR_ICON_GRAY = "#777777";
var COLOR_LINK = "#428bca";
var TIME_MS_ICON_ANIMATE = "176";
var TIME_MS_FADEIN_BODY = 500;

$(".no-link").hover(
    function() {
        $(this)
            .css('color',COLOR_ICON_GRAY)
            .animate({'color': COLOR_LINK}, TIME_MS_ICON_ANIMATE);
    },
    function() {
        $(this)
            .animate({'color': COLOR_ICON_GRAY}, TIME_MS_ICON_ANIMATE);
    }
);

$(".js .container").fadeIn(TIME_MS_FADEIN_BODY);