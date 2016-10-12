/* global pubdate */
/* global moment */
/* global $ */
/* global google */


google.load("feeds", "1");

/* github */
var githubfeedcontainer = document.getElementById("githubfeed");
var githubfeedurl = "https://github.com/michaelwoodruff.atom?nocache=" + (new Date()).getTime();
var githubfeedlimit = 7;
var githubrssoutput = "";

function displaygithubfeed(result) {
    if (!result.error) {
        var thegithubfeeds = result.feed.entries;
        githubrssoutput += "<ul>";
        for (var i = 0; i < thegithubfeeds.length; i++) {
            pubdate = new Date(thegithubfeeds[i].publishedDate),
                pubdate = moment(pubdate).format('dddd, MMMM Do YYYY, h:mm A'), // August 25th 2014, 12:49:58 am
                githubrssoutput += "<li><a href='" + thegithubfeeds[i].link + "'><i class=\"fa fa-github fa-lg\"></i><div class=\"post\">" + thegithubfeeds[i].title + "<div class=\"pubdate\">" + pubdate + "</div></div></a></li>";
        }
        githubrssoutput += "</ul>";
        githubfeedcontainer.innerHTML = githubrssoutput;
    } else {
        console.log("Error fetching GitHub feed!");
    }
}

function githubrssfeedsetup() {
    var githubfeedpointer = new google.feeds.Feed(githubfeedurl);
    githubfeedpointer.setNumEntries(githubfeedlimit);
    githubfeedpointer.load(displaygithubfeed);
}


/* pinboard */
var pinboardfeedcontainer = document.getElementById("pinboardfeed");
var pinboardfeedurl = "https://feeds.pinboard.in/rss/u:michaelwoodruff/?nocache=" + (new Date()).getTime();
var pinboardfeedlimit = 7;
var pinboardrssoutput = "";

function displaypinboardfeed(result) {
    if (!result.error) {
        var thepinboardfeeds = result.feed.entries;
        pinboardrssoutput += "<ul>";
        for (var i = 0; i < thepinboardfeeds.length; i++) {
            pubdate = new Date(thepinboardfeeds[i].publishedDate),
                pubdate = moment(pubdate).format('dddd, MMMM Do YYYY, h:mm A'), // August 25th 2014, 12:49:58 am
                pinboardrssoutput += "<li><a href='" + thepinboardfeeds[i].link + "'><i class=\"fa fa-thumb-tack fa-lg\"></i><div class=\"post\">" + thepinboardfeeds[i].title + "<div class=\"pubdate\">" + pubdate + "</div></div></a></li>";
        }
        pinboardrssoutput += "</ul>";
        pinboardfeedcontainer.innerHTML = pinboardrssoutput;
    } else {
        console.log("Error fetching pinboard feed!");
    }
}

function pinboardrssfeedsetup() {
    var pinboardfeedpointer = new google.feeds.Feed(pinboardfeedurl);
    pinboardfeedpointer.setNumEntries(pinboardfeedlimit);
    pinboardfeedpointer.load(displaypinboardfeed);
}

/* pocket */
// https://getpocket.com/users/michaelwoodruff/feed/all
var pocketfeedcontainer = document.getElementById("pocketfeed");
var pocketfeedurl = "https://getpocket.com/users/michaelwoodruff/feed/?nocache=" + (new Date()).getTime();
var pocketfeedlimit = 7;
var pocketrssoutput = "";

function displaypocketfeed(result) {
    if (!result.error) {
        var pocketfeeds = result.feed.entries;
        pocketrssoutput += "<ul>";
        for (var i = 0; i < pocketfeeds.length; i++) {
            pubdate = new Date(pocketfeeds[i].publishedDate),
                pubdate = moment(pubdate).format('dddd, MMMM Do YYYY, h:mm A'), // August 25th 2014, 12:49:58 am
                pocketrssoutput += "<li><a href='" + pocketfeeds[i].link + "'><i class=\"fa fa-get-pocket\"></i><div class=\"post\">" + pocketfeeds[i].title + "<div class=\"pubdate\">" + pubdate + "</div></div></a></li>";
        }
        pocketrssoutput += "</ul>";
        pocketfeedcontainer.innerHTML = pocketrssoutput;
    } else {
        console.log("Error fetching pocket feed!");
    }
}

function instapaperrssfeedsetup() {
    var pocketfeedpointer = new google.feeds.Feed(pocketfeedurl);
    pocketfeedpointer.setNumEntries(pocketfeedlimit);
    pocketfeedpointer.load(displaypocketfeed);
}


var foo = 10 + '20' + 10 + '30';
console.log("foo: " + foo);

$(document).ready(function() {

    $(document).on('click', '.js-easter-egg', function(e) {
        $(".sandbox-site").slideToggle("fast");
        $(".sandbox-site .portfolio-group-item").addClass("fadeInUp").css("opacity",1);
    });

    $(document).on('touchstart', '.js-easter-egg', function(e) {
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

    viewportWidth = $(document).width();

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
    console.log("currentURL: " + currentURL);
    $('.site-menu a[href="' + currentURL + '"]').addClass('active');





});
