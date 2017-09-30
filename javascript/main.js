
$(document).ready(function() {


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



    // feeds
    $.jribbble.setToken('68b75fe7f4f1f51ad81a862605bb7546e44403b5bba3ade6678547d34feb4769');

    // liking
    $.jribbble.users('michaelwoodruff').likes({per_page: 6}).then(function(likes) {
      var html = [];
      likes.forEach(function(like) {
        html.push('<div class="col-sm-6"><div class="shots-item">');
        html.push('<a href="' + like.shot.html_url + '" target="_blank">');
        html.push('<img class="center-block" src="' + like.shot.images.hidpi + '">');
        html.push('</a><div class="title truncate">' + like.shot.title + '</div><div class="author truncate">By <a href="' + like.shot.user.html_url + '">' + like.shot.user.name  + '</a> from ' + like.shot.user.location + '</div></div></div>');
      });
      //like.shot.user.avatar_url
      //<img src="' + like.shot.user.avatar_url + '">
      //  on '+ like.shot.created_at +
      $('.likes').html(html.join(''));
    });

    // my shots
    $.jribbble.users('michaelwoodruff').shots({per_page: 1}).then(function(shots) {
      var html = [];
      shots.forEach(function(shot) {
        html.push('<div class="shots-item">');
        html.push('<a href="' + shot.html_url + '" target="_blank">');
        html.push('<img class="center-block" src="' + shot.images.hidpi + '">');
        html.push('</a><div class="title truncate text-center">' + shot.title + '</div></div>');
      });

      $('.shots').html(html.join(''));
    });

    // buckets
    /*
        $.jribbble.users('michaelwoodruff').buckets({'per_page': 36}).then(function(res) {
          var html = [];
          res.forEach(function(bucket) {
            var bucketUrl = 'https://dribbble.com/michaelwoodruff' + '/buckets/' + bucket.id;
            html.push('<a href="' + bucketUrl + '" target="_blank">');
          	html.push('' + bucket.name + '</a> (' + bucket.shots_count + '), ');
            html.push('');
          });
          $('.buckets').html(html.join(''));
        });
    */


    // portfolio
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

    // active navigation element
    var currentURL = location.pathname;
    //console.log("currentURL: " + currentURL);
    $('.site-menu a[href="' + currentURL + '"]').addClass('active');


});
