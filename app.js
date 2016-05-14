//Standard temp unit
var unit = 'c';

$(document).ready(function() {
  //HTML5 Geolocation, get current long and lat
  navigator.geolocation.getCurrentPosition(function(position) {
    //passes the coordinates and units, loads weather
   loadWeather(position.coords.latitude+','+position.coords.longitude, unit);
  });
  
  //Change unit temp and reload weather
  $('button').click(function(){
    if($('button').attr('class') == 'btn f') {
      unit = 'f';
      $(this).html('In °C');
      $(this).attr('class', 'btn c')  
      navigator.geolocation.getCurrentPosition(function(position) {
       loadWeather(position.coords.latitude+','+position.coords.longitude, unit);
       });
    } else if($('button').attr('class') == 'btn c') {
        unit = 'c';
        $(this).html('In °F');
        $(this).attr('class', 'btn f')  
        navigator.geolocation.getCurrentPosition(function(position) {
         loadWeather(position.coords.latitude+','+position.coords.longitude, unit);
         });
    }
  });
});

//Loads weather
function loadWeather(location, unit) {
  $.simpleWeather({
    location: location,
    woeid: '',
    unit: unit,
    success: function(weather) {
      html = '<h2>' + weather.city + ', ' + weather.country + '</h2>';
      html += '<h1> <i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h1>';
      html += '<h4>' + weather.title + '</h4>';
      $("#weather").html(html);
      
      //Change BG depending on temp
      if(unit == 'c') {
        if(weather.temp < 20) {
          $('body').css('background', '#85A4D3');
        } else if(weather.temp > 20 && weather.temp < 30) {
          $('body').css('background', '#1369E3');
        } else {
          $('body').css('background', '#E39113');
        }
      } else if(unit == 'f') {
        if(weather.temp < 68) {
          $('body').css('background', '#85A4D3');
        } else if(weather.temp > 68 && weather.temp < 86) {
          $('body').css('background', '#1369E3');
        } else {
          $('body').css('background', '#E39113');
        }
      }
      
    },
    error: function(error) {
      $("#temperature").html(error);
    }
  });
}