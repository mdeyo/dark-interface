
var wundergroundKey = "fc1647b48e4d03df"

function init() {
  const mo = moment();
  $('#time').html(mo.format('HH:mm'));
  $('#date').html(mo.format('MMMM Do, YYYY'));
  $('#day').html(mo.format('dddd'));
  setInterval(() => {
    const mo = moment();
    $('#time').html(mo.format('HH:mm'));
    $('#date').html(mo.format('MMMM Do, YYYY'));
    $('#day').html(mo.format('dddd'));
  }, 1000);

  $(document).ready(() => {
    $.ajax({
    url : `http://api.wunderground.com/api/${wundergroundKey}/geolookup/conditions/q/CA/San_Francisco.json`,
    dataType : 'jsonp',
    success : (parsed_json) => {
      const location = parsed_json['location']['city'];
      const temp_f = parsed_json['current_observation']['temp_f'];
      const icon_url = parsed_json['current_observation']['icon_url'];
      $('#temp').html(`${temp_f}&deg;`);
      $('#location').html(location);
      }
    });
  });

  $(document).ready(() => {
    $.ajax({
      url : `http://api.wunderground.com/api/${wundergroundKey}/geolookup/forecast/q/CA/San_Francisco.json`,
      dataType : 'jsonp',
      success : (parsed_json) => {
      	const high = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
      	const low = parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['fahrenheit'];
        $('#minmax').html(`High: ${high}&deg;, Low: ${low}&deg;`);
      }
    });
  });
}
