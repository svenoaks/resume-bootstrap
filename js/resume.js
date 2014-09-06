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

function navbarFixUnfix() {
    var pos = $(window).scrollTop();
    var pos_fixed_min = parseFloat(cssToNumeric($('.m-body').css("padding-top")));
    var cur_width = $(".container").css('width');

    if (pos > pos_fixed_min && cur_width == '940px') {
        $(".row-nav").css({
            "position": "fixed",
            "top":    "0",
            "width":    "936px",
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
    $(window).scroll(navbarFixUnfix);
    $(window).resize(navbarFixUnfix);

    jQuery(function( $ ){
        /**
         * Most jQuery.localScroll's settings, actually belong to jQuery.ScrollTo, check it's demo for an example of each option.
         * @see http://flesler.demos.com/jquery/scrollTo/
         * You can use EVERY single setting of jQuery.ScrollTo, in the settings hash you send to jQuery.LocalScroll.
         */

            // The default axis is 'y', but in this demo, I want to scroll both
            // You can modify any default like this
        $.localScroll.defaults.axis = 'y';

        /**
         * NOTE: I use $.localScroll instead of $('#navigation').localScroll() so I
         * also affect the >> and << links. I want every link in the page to scroll.
         */
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
    });
});


