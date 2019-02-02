require('../../utils/capitalize.js');

import clock from '../clock/clock.js'
import secrets from '../../../config/secrets.js'

var $ = require('jquery');
var template = require('./screen.hbs');

export default function() {
  var updateStops = function() {
    // curl -X GET --header "Accept: application/json"
    $.get({
      url: '/api/stop-monitoring?' +
           'MonitoringRef=STIF%3AStopPoint%3AQ%3A41339%3A&apikey=' +
           secrets.api_key,
      dataType: 'json',
      success: processStopMonitoringResponse
    });
  }

  var processStopMonitoringResponse = function(response) {
    var nextDepartures = parseStopMonitoringResponse(response);
  }

  var parseStopMonitoringResponse = function(response) {
    var monitoring = response.Siri.ServiceDelivery.StopMonitoringDelivery[0]
    return monitoring.MonitoredStopVisit.map(function(visit) {
      var journey = visit.MonitoredVehicleJourney;
      var call = journey.MonitoredCall;

      return {
        mission: journey.JourneyNote[0].value,
        status: call.ArrivalStatus,
        aimed_at: call.AimedDepartureTime,
        expected_at: call.ExpectedDepartureTime,
        platform: call.ArrivalPlatformName.value,
        at_stop: call.VehicleAtStop,
        destination: stationName(journey.DestinationName[0].value)
      }
    });
  }

  var stationName = function(raw_name) {
    var name = null;
    if (name == null) {
      var capitalized_name = raw_name.replace(/^GARE D(E |')/, '').capitalize();
      var name_without_first_char = capitalized_name.substr(1)
      name = raw_name[0] + name_without_first_char.capitalize()
                                                  .replace('De', 'de')
                                                  .replace('Le', 'le');
    }

    return name;
  }

  return {
    init: function() {
      $('[data-component=screen]').html(template());

      clock().init();
      updateStops();
    }
  }
}
