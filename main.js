
var wundergroundKey = "fc1647b48e4d03df"

var wunderRequest;

var jsonObject,jsonForecastObject;
var weatherIcon, weatherTitle, weatherText, forecastText;

function init() {
  setInterval(() => {
    $('#time').html(moment().format('hh:mm'));
    $('#seconds').html(moment().format('ss'));
    $('#tz').html(moment().format('a'));
    $('#date').html(moment().format('MMMM Do, YYYY'));
    $('#dow').html(moment().format('dddd'));
  }, 1000);

  weatherIcon = document.getElementById('weather-icon');
  weatherTitle = document.getElementById('weather-title');
  weatherText = document.getElementById('weather-text');
  forecastText = document.getElementById('forecast-text');

  $(document).ready(function($) {
    $.ajax({
    url : "http://api.wunderground.com/api/"+wundergroundKey+"/geolookup/conditions/q/CA/San_Francisco.json",
    dataType : "jsonp",
    success : function(parsed_json) {
    	jsonObject = parsed_json;
      var location = parsed_json['location']['city'];
      var temp_f = parsed_json['current_observation']['temp_f'];
      var temp_feels_f = parsed_json['current_observation']['feelslike_f'];
      var icon_url = parsed_json['current_observation']['icon_url'];
      weatherIcon.src = icon_url;
      weatherTitle.innerHTML = "Current temperature in " + location;
      weatherText.innerHTML = temp_f + " F";
      }
    });
  });

  $(document).ready(function($) {
    $.ajax({
      url : "http://api.wunderground.com/api/"+wundergroundKey+"/geolookup/forecast/q/CA/San_Francisco.json",
      dataType : "jsonp",
      success : function(parsed_json) {
      	jsonForecastObject = parsed_json;
      	var high = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
      	var low = parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['fahrenheit'];
      	forecastText.innerHTML = 'Low: ' +low + 'F <br/> High: '+high+'F';
      }
    });
  });
}
