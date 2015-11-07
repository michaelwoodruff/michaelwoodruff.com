/* global pubdate */
/* global moment */
/* global $ */
/* global google */


google.load("feeds", "1");

/* github */
var githubfeedcontainer = document.getElementById("githubfeed");
var githubfeedurl = "https://github.com/michaelwoodruff.atom?nocache=" + (new Date()).getTime();
var githubfeedlimit = 5;
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
var pinboardfeedlimit = 5;
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


/* instapaper */
var instapaperfeedcontainer = document.getElementById("instapaperfeed");
var instapaperfeedurl = "https://www.instapaper.com/rss/288665/rdPIqInL3mfgAr91yeUJ600TuSU?nocache=" + (new Date()).getTime();
var instapaperfeedlimit = 10;
var instapaperrssoutput = "";
function displayinstapaperfeed(result) {
	if (!result.error) {
	 	var theinstapaperfeeds = result.feed.entries;
		instapaperrssoutput += "<ul>";
		for (var i = 0; i < theinstapaperfeeds.length; i++) {
			pubdate = new Date(theinstapaperfeeds[i].publishedDate),
			pubdate = moment(pubdate).format('dddd, MMMM Do YYYY, h:mm A'), // August 25th 2014, 12:49:58 am
			instapaperrssoutput += "<li><a href='" + theinstapaperfeeds[i].link + "'><i class=\"fa fa-file-text-o fa-lg\"></i><div class=\"post\">" + theinstapaperfeeds[i].title + "<div class=\"pubdate\">" + pubdate + "</div></div></a></li>";
		}
		instapaperrssoutput += "</ul>";
		instapaperfeedcontainer.innerHTML = instapaperrssoutput;
	} else {
		console.log("Error fetching instapaper feed!");
	}
}
function instapaperrssfeedsetup() {
	var instapaperfeedpointer = new google.feeds.Feed(instapaperfeedurl);
	instapaperfeedpointer.setNumEntries(instapaperfeedlimit);
	instapaperfeedpointer.load(displayinstapaperfeed);
}




$(document).ready(function () {

    var currentURL = location.pathname;
	$('.navbar-site a[href="' + currentURL + '"]').parent("li").addClass('active');

});

window.onload = function () {
	pinboardrssfeedsetup();
	githubrssfeedsetup();
    instapaperrssfeedsetup();
};
