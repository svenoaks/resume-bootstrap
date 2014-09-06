/**
 * Created by Steve on 8/24/14.
 */
var COLOR_ICON_GRAY = "#777";
var COLOR_LINK = "#428bca";

var TIME_MS_ICON_ANIMATE = "100";
var TIME_MS_FADEIN_BODY = 500;

function cssToNumeric(cssStr) {
    return cssStr.replace(/[^-\d\.]/g, '');
}

function navbarFixUnfix(pos_fixed_min) {
   var pos = $(window).scrollTop();

    var cur_width = $(".container").css('width');

    if (pos > pos_fixed_min && cur_width == '940px') {
        $(".row-nav").css({
            "position": "fixed",
            "top":    "0",
            "width":    "936px",
        });
        $("#aftermenuspace").css({
            "height":    "50px"
        });
    } else {
        $(".row-nav").css({
            "position": "initial",
            "width":    "initial"
        });
        $("#aftermenuspace").css({
            "height":    "0"
        });
    }
}

$( document ).ready(function() {

    $(".js .container").fadeIn(TIME_MS_FADEIN_BODY);

    $(".icon-social, .m-address a").hover(
        function() {
            $(this)
                .clearQueue()
                .css('color',COLOR_ICON_GRAY)
                .animate({'color': COLOR_LINK}, TIME_MS_ICON_ANIMATE);
        },
        function() {
            $(this)
                .animate({'color': COLOR_ICON_GRAY}, TIME_MS_ICON_ANIMATE);
        }
    );
    var pos_fixed_min = $(".m-navbar").offset().top;

    $(window).scroll(function() {
        navbarFixUnfix(pos_fixed_min);
    });
    $(window).resize(function() {
        navbarFixUnfix(pos_fixed_min);
    });
    //$(window).resize(navbarFixUnfix);

    /*jQuery(function( $ ){

        $.localScroll.defaults.axis = 'y';

        $.localScroll({
            target: '#education', // could be a selector or a jQuery object too.
            queue:true,
            duration:1000,
            hash:true,
            onBefore:function( e, anchor, $target ){
                // The 'this' is the settings object, can be modified
            },
            onAfter:function( anchor, settings ){
                // The 'this' contains the scrolled element (#content)
            }
        });
    });*/
});


