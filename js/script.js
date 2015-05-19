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

//Maps
$(function() {
    var web="http://goo.gl/KQBV2C";
    var html= "<div><h5>Centro Estudiantil</h5><p>Tec de Monterrey<p><a href='"+web+"'' target='_blank''>Abrir en Google Maps<a></div>";
   $('#map').initMap({
        center : [25.648945,-100.289924], // Plain text address, or array of latitude / longitude: [ lat , lng ]
        type: 'roadmap', // hybrid, roadmap, satellite, terain
        options: { zoom: 17, scrollwheel: false }, // Any property that is defined in google.maps.MapOptions
        markers : {
            tec : {
                position: [ 25.648945, -100.289924 ],
                info_window : { 
                    content : html,
                    maxWidth: 300,
                    zIndex: 1
                }
            }
        }
    });
});

