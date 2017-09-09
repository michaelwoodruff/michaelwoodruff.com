
$(document).ready(function() {

    var viewportWidth = $(document).width();

    $(document).on('click', '.js-easter-egg', function() {
        $(".sandbox-site").slideToggle("fast");
        $(".sandbox-site .portfolio-group-item").addClass("fadeInUp").css("opacity",1);
    });

    $(document).on('touchstart', '.js-easter-egg', function() {
        $(".sandbox-site").slideToggle("fast");
        $(".sandbox-site .portfolio-group-item").addClass("fadeInUp").css("opacity",1);
    });

    $('.page-content').addClass("fadeInUp").css("opacity",1);

    $('.portfolio-group-item').each(function(i) {
        var row = $(this);
        setTimeout(function() {
            row.toggleClass('fadeInUp');
        }, 100 * i);
    });

    if (viewportWidth >= 768) {
        $('.portfolio-group-item').on("touchstart", function(e) {
            "use strict";
            var link = $(this);
            if (link.hasClass('hover')) {
                return true;
            } else {
                link.addClass("hover");
                $('a.taphover').not(this).removeClass("hover");
                e.preventDefault();
                return false; //extra, and to make sure the function has consistent return points
            }
        });
    }

    // fancy boxy dialogs
    $(".dialog-default").fancybox({
        //type: 'iframe',
        //fitToView: true
    });

    $(".dialog-image").fancybox();

    $(".dialog-pdf").fancybox({
        wrapCSS: 'fb-pdf',
        type: 'iframe',
        openEffect: 'none',
        closeEffect: 'none',
        iframe: {
            preload: false
        }
    });

    var scroll = $(document).scrollTop();
    var headerHeight = $('.page-header').outerHeight();

    $(window).scroll(function() {
        var scrolled = $(document).scrollTop();
        if (scrolled > headerHeight) {
            $('.page-header').addClass('off-canvas');
        } else {
            $('.page-header').removeClass('off-canvas');
        }
        if (scrolled > scroll) {
            $('.page-header').removeClass('fixed');
        } else {
            $('.page-header').addClass('fixed');
        }
        scroll = $(document).scrollTop();
    });

    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error animated shake');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error animated shake');
        },
        errorElement: 'div',
        errorClass: 'error-msg',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    // generic validation
    $(".form-validate").each(function() { // attach to all form elements on page
        $(this).validate();
    });


    var currentURL = location.pathname;
    //console.log("currentURL: " + currentURL);
    $('.site-menu a[href="' + currentURL + '"]').addClass('active');


});
