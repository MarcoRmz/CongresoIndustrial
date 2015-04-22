
// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Schedule Collapse in Mobile
$(window).bind('resize load',function(){
	if( $(this).width() < 767 ) {
		$('.collapse').removeClass('in');
		$('.collapse').addClass('out');
	}
	else {
		$('.collapse').removeClass('out');
		$('.collapse').addClass('in');
	}   
});