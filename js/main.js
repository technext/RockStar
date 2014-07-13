(function($,sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
				                  func.apply(obj, args);
				timeout = null;
			}
			;
			if (timeout)
			              clearTimeout(timeout); else if (execAsap)
			              func.apply(obj, args);
			timeout = setTimeout(delayed, threshold || 100);
		}
		;
	}
	// smartresize 
	jQuery.fn[sr] = function(fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	}
	;
}
)(jQuery,'smartresize');


$(document).ready(function() {
	///////////////////////////////
	// Set Home Slideshow Height
	///////////////////////////////
	function setHomeBannerHeight() {
		var windowHeight = jQuery(window).height();
		jQuery('#header').height(windowHeight);
	}
	///////////////////////////////
	// Center Home Slideshow Text
	///////////////////////////////
	function centerHomeBannerText() {
		var bannerText = jQuery('#header > .center');
		var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header > .center').actual('height')/2) - 20;
		bannerText.css('padding-top', bannerTextTop+'px');
		bannerText.show();
	}
	setHomeBannerHeight();
	centerHomeBannerText();
	//Resize events
	jQuery(window).smartresize(function() {
		setHomeBannerHeight();
		centerHomeBannerText();
	});
	var menu = $('#menu');
	var origOffsetY = menu.offset().top;
	function scroll() {
		if ($(window).scrollTop() >= origOffsetY) {
			$('#menu').addClass('navbar-fixed-top');
			$('#header').addClass('menu-padding');
		} else {
			$('#menu').removeClass('navbar-fixed-top');
			$('#header').removeClass('menu-padding');
		}
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			addPackery();
		}
	}
	document.onscroll = scroll;
	var $scrollDownArrow = $('#scrollDownArrow');
	var animateScrollDownArrow = function() {
		$scrollDownArrow.animate( {
			top: 5,
		}
		, 400, "linear", function() {
			$scrollDownArrow.animate( {
				top: -5,
			}
			, 400, "linear", function() {
				animateScrollDownArrow();
			}
			);
		});
	}
	animateScrollDownArrow();
	//Set Down Arrow Button
	jQuery('#scrollDownArrow').click(function(e) {
		e.preventDefault();
		jQuery.scrollTo("#services", 1000, {
			offset:-(jQuery('#header .top').height()), axis:'y'
		}
		);
	});
	jQuery('.nav > li > a').click(function(e) {
		e.preventDefault();
		jQuery.scrollTo(jQuery(this).attr('href'), 400, {
			offset:-(jQuery('#header .top').height()), axis:'y'
		}
		);
	});
	var $packery = $('#packery');
	// init
	$packery.packery( {
		itemSelector: '.item',
				  gutter: 0
	});
	function addPackery() {
		// create new item elements
		var elems = [];
		for ( var i = 1; i < 23; i++ ) {
			var elem = getItemElement(i);
			elems.push( elem );
		}
		// append elements to container
		$packery.append( elems );
		// add and lay out newly appended elements
		$packery.packery( 'appended', elems );
	}
	// create random item element
	function getItemElement(i) {
		//<a class="item" href="#"><img src="img/packery/'+i+'.jpg" alt=""></a>
		var elem = document.createElement('a');
		elem.className = 'item ';
		elem.href='#';
		elem.innerHTML = '<img src="img/packery/'+i+'.jpg" alt=""><div class="item-description"><h2>Lorem Ipsum <strong>Dolorea</strong></h2></div>';
		return elem;
	}
});