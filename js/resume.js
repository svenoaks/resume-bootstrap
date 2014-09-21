/**
 * Created by Steve on 8/24/14.
 */

(function() {
    "use strict";

    function cssToNumeric(cssStr) {
        return cssStr.replace(/[^-\d\.]/g, '');
    }

    var WIDTH_DESKTOP = "940px";
    var WIDTH_FOR_FIX = "940px";
    var HEIGHT_NAVBAR = "62px";

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
                offsetTop = href === "#" ? 0 : $(href).offset().top - 7,
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
                    noScrollAction = false;
                    /*setTimeout(function () {
                        noScrollAction = false;
                    }, 400);*/
                }
            });
            e.preventDefault();
        });

        $(window).scroll(determineScroll);
        $(window).resize(determineScroll);

        function determineScroll() {
            if (!noScrollAction) {
                // Get container scroll position
                var fromTop = $(this).scrollTop();

                // Get id of current scroll item
                var passed = scrollItems.map(function () {
                    if ($(this).offset().top < fromTop + 8)
                        return this;
                });

                // Get the id of the current elemen
                var cur = passed.length > 0 ? passed[passed.length - 1] : scrollItems[0];
                var id = cur && cur.length ? cur[0].id : "";

                if (lastId !== id) {
                    lastId = id;
                    // Set/remove active class
                    menuItems
                        .parent().removeClass("active")
                        .end().filter("[href=#" + id + "]").parent().addClass("active");
                }
                if (passed.length == menuItems.length)
                {
                    var offsetTop = $(scrollItems[scrollItems.length - 1]).offset().top - 6;
                    $("html, body").scrollTop(offsetTop);
                }
            }
        }

    }

    function fadeInBody() {
        var TIME_MS_FADEIN_BODY = 500;

        $(".js .container").fadeIn(TIME_MS_FADEIN_BODY);
    }
    function addMoveIcons() {
        /*var pos_fixed_min = cssToNumeric($(".m-body").css("padding-top"));
        $(window).scroll(function () {
            var fromTop = $(this).scrollTop();
            if (fromTop > pos_fixed_min) {
                moveBlock($(".block-icon-save-print"), $(".block-icon-save-print-absolute"));
            }
        });*/
    }
    function moveBlock(from, to)
    {
        (function() {

            var tmp_from = from;
            var tmp_to = to;
            var pos = tmp_from.offset();
            var temp = tmp_from.clone(true);

            temp.css({ "visibility":"visible",
                "position":"absolute",
                "top":pos.top + "px",
                "left":pos.left + "px"});
            temp.appendTo("body");
            tmp_from.css("visibility", "hidden");

            temp.animate(to.offset(), 500, function() {
                tmp_to.css("visibility", "visible");
                temp.stop(true);
                temp.remove();
            });
        })();
    }
    $(document).ready(function () {

        fadeInBody();

        addNavbarFix();

        addNavbarScroll();

        addMoveIcons();
    });
})();



