(function () {
    "use strict";

    $(document).ready(function () {
        fadeInBody();
        addNavbarFix();
        addNavbarScroll();
        addSubmitListener();
        addPortfolioListener();
        addIconListeners();
        disablePrintButtonSafari();
    });


    //This function fixes the Navbar at the top of the window when it scrolls off the screen when the desktop layout
    //is active.
    function addNavbarFix() {
        var pos_fixed_min = cssToNumeric($(".m-body").css("padding-top"));

        $(window).scroll(function () {
            navbarFixUnfix(pos_fixed_min);
        });
        $(window).resize(function () {
            navbarFixUnfix(pos_fixed_min);
        });

        function navbarFixUnfix(pos_fixed_min) {
            var WIDTH_DESKTOP = "940px";
            var HEIGHT_NAVBAR = "62px";

            var pos = $(window).scrollTop();
            var cur_width = $(".container").css('width');

            if (pos > pos_fixed_min && cur_width == WIDTH_DESKTOP) {
                $(".row-nav").css({
                    "position": "fixed",
                    "top": "0",
                    "width": WIDTH_DESKTOP
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
    }


    //This function handles the scrolling of the view as it relates to the Navbar.
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

        $(window).scroll(determineScroll);
        $(window).resize(determineScroll);

        function determineScroll() {
            if (!noScrollAction) {
                // Get container scroll position
                var fromTop = $(this).scrollTop();

                // Get id of current scroll item
                var passed = scrollItems.map(function () {
                    if ($(this).offset().top < fromTop + 15)
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
            }
        }

        function scrollToSection(section, e) {
            var href = $(section).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - 6;
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
                        lastId = href.slice(1, href.length);
                        noScrollAction = false;
                    }, 10);

                }
            });
            if (e != undefined)
                e.preventDefault();
        };
        function navOpen() {
            return $(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible");
        }

        $('body').click(function () {
            if (navOpen()) {
                $('.navbar-collapse').collapse('toggle');
            }
        });

        menuItems.on("click", function (event) {
            if (navOpen()) {
                var lastSectionClicked = this;

                $(".navbar-collapse").one("hidden.bs.collapse", function () {
                    setTimeout(function () {
                        scrollToSection(lastSectionClicked, null);
                    }, 200);

                });
                event.preventDefault();
                event.stopPropagation();

                $('.navbar-collapse').collapse('toggle');

            }
            else {
                scrollToSection(this, event);
            }
        });
    }

    //This function fades in the page when loaded.
    function fadeInBody() {
        var TIME_MS_FADEIN_BODY = 500;

        $(".js .container").fadeIn(TIME_MS_FADEIN_BODY);
    }

    //Function to handle the contact form submittal.
    function addSubmitListener() {
        var request;
        $("#form-submit").submit(function (event) {
            if (request) {
                request.abort();
            }
            var $form = $(this);
            var $inputs = $form.find("input, select, button, textarea");

            var serializedData = $form.serialize();

            $inputs.prop("disabled", true);

            request = $.ajax({
                url: "xyz.php",
                type: "post",
                data: serializedData
            });

            request.done(function (response, textStatus, jqXHR) {
                if (response == 'success')
                    setModalInfo(true);
                else
                    setModalInfo(false);

                $('#modal-submit').modal('show');

            });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                setModalInfo(false);
                $('#modal-submit').modal('show');
            });

            request.always(function () {

                $inputs.prop("disabled", false);
            });

            event.preventDefault();
        });
        function setModalInfo(success) {
            if (success) {
                $('#label-submit').html('Message Sent');
                $('#body-submit p').html('Thank you for contacting me. I will reply within 24 hours.');
            }
            else {
                $('#label-submit').html('Problem sending message');
                $('#body-submit p').html('Please try the submission again.');
            }
        }
    }

    //This function makes the correct text visible when the Portfolio items are clicked.
    function addPortfolioListener() {
        var portfolioHeadings = $("#modal-portfolio h4").hide(),
            portfolioBody = $("#body-portfolio div").hide(),
            SKIP_IDENTIFIER = 2;

        $('.img-portfolio').click(function () {
            setModalInfo(this);
            $('#modal-portfolio').modal('show');
        });
        function setModalInfo(which) {
            var id = $(which).attr("id").substring(SKIP_IDENTIFIER);

            portfolioHeadings.hide();
            portfolioBody.hide();

            $("#h-" + id).show();
            $(".body-" + id).show();
        }
    }

    //This function prints the window when the print button is clicked.
    function addIconListeners() {
        $(".icon-print").click(function () {
            window.print();
        });
    }

    //This function disables the print button for Safari browsers since it is problematic.
    function disablePrintButtonSafari() {
        var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
        if (isSafari) {
            var elem = $(".block-icons .icon-print");
            elem[0].style.setProperty('display', 'none', 'important');
        }
    }

    function cssToNumeric(cssStr) {
        return cssStr.replace(/[^-\d\.]/g, '');
    }
})();

