/**
 * Created by Steve on 8/24/14.
 */
//TODO: get from css
var COLOR_ICON_GRAY = "#777";
var COLOR_LINK = "#428bca";

var TIME_MS_ICON_ANIMATE = 300;
var TIME_MS_FADEIN_BODY = 500;

var WIDTH_DESKTOP = "940px";
var WIDTH_FOR_FIX = "936px";

var HEIGHT_NAVBAR = "50px";


function cssToNumeric(cssStr) {
    return cssStr.replace(/[^-\d\.]/g, '');
}

function navbarFixUnfix(pos_fixed_min) {
    var pos = $(window).scrollTop();
    var cur_width = $(".container").css('width');

    if (pos > pos_fixed_min && cur_width == WIDTH_DESKTOP) {
        $(".row-nav").css({
            "position": "fixed",
            "top": "0",
            "width": WIDTH_FOR_FIX
        });
        $("#aftermenuspace").css({
            "height": HEIGHT_NAVBAR
        });
    } else {
        $(".row-nav").css({
            "position": "static",
            "width": "initial"
        });
        $("#aftermenuspace").css({
            "height": "0"
        });
    }
}

function addNavbarFix() {
    var pos_fixed_min = cssToNumeric($(".m-body").css("padding-top"));

    $(window).scroll(function () {
        navbarFixUnfix(pos_fixed_min);
    });
    $(window).resize(function () {
        navbarFixUnfix(pos_fixed_min);
    });
}

function addNavbarScroll() {
    var lastId,
        topMenu = $(".m-navbar-nav"),
        topMenuHeight = topMenu.outerHeight() + 15,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        }),
        noScrollAction = false;

    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top + 2,
            fromTop = $(this).scrollTop();
        noScrollAction = true;
        $("html, body").stop().animate({
            scrollTop: offsetTop
        }, {
            duration: 300,
            complete: function () {
                menuItems
                    .parent().removeClass("active");
                menuItems.filter("[href=" + href + "]").parent().addClass("active");
                setTimeout(function () {
                    noScrollAction = false;
                }, 10);
            }
        });
        e.preventDefault();
    });

    $(window).scroll(function () {
        if (!noScrollAction) {
            // Get container scroll position
            var fromTop = $(this).scrollTop();

            // Get id of current scroll item
            var passed = scrollItems.map(function () {
                if ($(this).offset().top < fromTop)
                    return this;
            });

            if (passed.length > 0) {
                // Get the id of the current elemen
                var cur = passed[passed.length - 1];
                var id = cur && cur.length ? cur[0].id : "";

                if (lastId !== id) {
                    lastId = id;
                    // Set/remove active class
                    menuItems
                        .parent().removeClass("active")
                        .end().filter("[href=#" + id + "]").parent().addClass("active");
                }
            }
            if (passed.length == menuItems.length)
            {
                var offsetTop = $(scrollItems[scrollItems.length - 1]).offset().top + 2;
                $("html, body").scrollTop(offsetTop);
            }
        }
    });

}
$(document).ready(function () {

    $(".js .container").fadeIn(TIME_MS_FADEIN_BODY);

    addNavbarFix();

    addNavbarScroll();
});


