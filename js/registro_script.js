var TallerValue;
var VisitaValue;
var Encrypt_Taller;
var Encrypt_Visita;
var URL_complete;
var checkValue = false;

$(document).ready(function() {
    $('#form').bootstrapWizard({'tabClass': 'bwizard-steps', 'debug': false, onShow: function(tab, navigation, index) {
                
            }, onNext: function(tab, navigation, index) {
                if (index == 1){
                                    // Make sure we entered the name
                    if(!$('#email').val()) {
                        alert('Debes de escribir tu email');
                        $('#email').focus();
                        return false;
                    }

                    if(!$('#folio').val()) {
                        alert('Debes de escribir tu folio');
                        $('#folio').focus();
                        return false;
                    }

                    if ($('#email').val() && $('#folio').val()) {
                        get_URL_code();
                        if (checkValue){
                            document.getElementById("validate").innerHTML = "Siguiente";
                            return true;
                        }
                    } 
                }
                if (index == 2){
                    get_checked_radio('talleres', index);
                    return true;
                }
                else if (index == 3){
                    get_checked_radio('visitas', index);
                    document.getElementById("codigoTaller").innerHTML = "Taller" + TallerValue + Encrypt_Taller;
                    document.getElementById("codigoVisita").innerHTML = "Visita" + VisitaValue + Encrypt_Visita;
                    return true;
                }
                return false;
            }, onPrevious: function(tab, navigation, index) {
                
            }, onLast: function(tab, navigation, index) {
                return false;
            }, onTabClick: function(tab, navigation, index) {
                return false;
            }, onTabShow: function(tab, navigation, index) {
                console.log("tab: " + tab + " " + index + " 2 ");
                var $total = navigation.find('li').length;
                var $current = index+1;
                var $percent = ($current/$total) * 100;
                $('#form .progress-bar').css({width:$percent+'%'});

                // If it's the last tab then hide the last button and show the finish instead
                if($current >= $total) {
                    $('#form').find('.pager .next').hide();
                    $('#form').find('.pager .finish').show();
                    $('#form').find('.pager .finish').removeClass('disabled');
                } else {
                    $('#form').find('.pager .next').show();
                    $('#form').find('.pager .finish').hide();
                }
            }});

        $('#form .finish').click(function() {
            alert('Registro Completo!');
            window.location="http://www.congresoindustrial.com.mx";
        });

});
        
function get_checked_radio(name, index)
{
    var radioElements = document.getElementsByName(name);

    for(var i=0; i < radioElements.length; i++)
    {
        if(radioElements[i].checked) 
        {
            if(index == 2){
                TallerValue = i+1;
                Encrypt_Taller = Math.round((i+1+253)/2);
            }
            else if (index == 3){
                VisitaValue = i+1;
                Encrypt_Visita = Math.round(((i+1+254)*2)/3);
            }
        }
    }
}

var Token;
var AccessToken;
eventjoy.setApiKey('5c27f9e1de27081311a387dd938cf19d27e6');

/*
function isAuthorized(callback) {
    console.log('isAuthorized funct called');
    if ( localStorage.getItem( 'eventjoy_access_token' ) ) {
      // We aleady have an access token
      console.log('found access token: '+localStorage.getItem('eventjoy_access_token'));
      eventjoy.setAccessToken( localStorage.getItem('eventjoy_access_token') );
      if ( callback ) callback( true );
    } else if ( localStorage.getItem( 'eventjoy_oauth_token' ) ) {
      // No, but we we do have a oauth request token
      console.log('found oauth token: '+localStorage.getItem('eventjoy_oauth_token'));
      eventjoy.auth( localStorage.getItem('eventjoy_oauth_token'), function(success, response) {
        localStorage.setItem( 'eventjoy_access_token', response.access_token);
        if ( callback ) callback( true );
      });
    } else {
      console.log('no auth found');
      if ( callback ) callback( false );
    }
} */

function get_URL_code() {
    URL_complete = window.location.href;
    point = URL_complete.lastIndexOf("=")+1;
    URL_Code = URL_complete.substr(point);
    Token = decodeURIComponent(URL_Code);
    Token = "IiivMq/eoVxYaEKHGcp92m/IG2WJ8WKiMdg6g816qCz2k3lB8GI+enwy0qoDHFDYktW5gqLwBvcu/Qksfj9/aMDRLl1niFJ+Y07L1j/yYgJilytuCUOJLW520YS9xgWX";
    processAuth();
}

function getFolio(attendeeID) {
    var data2 = null;
    var xhr2 = new XMLHttpRequest();
    var jsonResponse2;
    var folio;

    xhr2.withCredentials = false;

    xhr2.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        //console.log(this.responseText);
        jsonResponse2 = JSON.parse(xhr2.responseText);
        //console.log(jsonResponse2);
        console.log("Folio: "+ xhr2.responseText.substring(xhr2.responseText.indexOf("Folio") + 9, xhr2.responseText.indexOf("}]}}") - 1));
        folio = xhr2.responseText.substring(xhr2.responseText.indexOf("Folio") + 9, xhr2.responseText.indexOf("}]}}") - 1);

        if (document.getElementById("folio").value == folio) {
            console.log("Folio OK!");
            checkValue = true;
        } else {
            console.log("Folio ERROR!");
        }
      }
    });

    xhr2.open("GET", "https://api.eventjoy.com/v1/attendees/" + attendeeID);
    xhr2.setRequestHeader("content-type", "application/json");
    xhr2.setRequestHeader("x-api-key", "5c27f9e1de27081311a387dd938cf19d27e6");
    xhr2.setRequestHeader("access_token", "83aaKha3glwxhU5fhFqtMkfqg1f3FLL948ZYYC9cQmHqzzNTOWUQZhOARaJoblVgjNHFKdZN01GCV0oHsvwwmw77KA==");

    xhr2.send(data2);
}

function processAuth() {
    console.log('processAuth');

    eventjoy.auth(Token, function(success, response) {
        //localStorage.setItem( 'eventjoy_access_token', response.access_token);
        AccessToken = response.access_token;
        //eventjoy.setAccessToken(AccessToken);
        //if ( callback ) callback( true );
    });

    eventjoy.setAccessToken("83aaKha3glwxhU5fhFqtMkfqg1f3FLL948ZYYC9cQmHqzzNTOWUQZhOARaJoblVgjNHFKdZN01GCV0oHsvwwmw77KA==");

    if (Token != '') {
        console.log('Authorized');

        var data = null;
        var xhr = new XMLHttpRequest();
        var jsonResponse;

        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            //console.log(this.responseText);
            jsonResponse = JSON.parse(xhr.responseText);
            //console.log(jsonResponse);
            console.log("Attendee ID: " + xhr.responseText.substring(xhr.responseText.indexOf("ID") + 4, xhr.responseText.indexOf("type") - 2));
            getFolio(xhr.responseText.substring(xhr.responseText.indexOf("ID") + 4, xhr.responseText.indexOf("type") - 2));
          }
        });

        xhr.open("GET", "https://api.eventjoy.com/v1/events/3451277/attendees/email/" + document.getElementById("email").value);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-api-key", "5c27f9e1de27081311a387dd938cf19d27e6");
        xhr.setRequestHeader("access_token", "83aaKha3glwxhU5fhFqtMkfqg1f3FLL948ZYYC9cQmHqzzNTOWUQZhOARaJoblVgjNHFKdZN01GCV0oHsvwwmw77KA==");

        xhr.send(data);
        /*
        eventjoy.order(3480864, function(success, order) {
            //Parse Attendee Response
            if ( success && order ) {
                console.log("order success");
                fetch.innerHTML = JSON.stringify(order, null, 2);
                console.log(order.data);
            } else {
                console.log("order failed");
            }
        }); */
        
    } else {
        console.log('Not Authorized');
    }
}

function startLogin() {
    console.log('Login started');
    eventjoy.login(function() {
      processAuth();
      console.log('Login closed');
    });
}