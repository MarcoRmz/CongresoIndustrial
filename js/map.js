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
