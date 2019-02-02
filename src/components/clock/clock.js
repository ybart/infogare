var $ = require('jquery');
var moment = require('moment');
var template = require('./clock.hbs');

export default function() {
  var updateClock = function() {
    $('[data-component=clock] .clock-time').html(moment().format('HH:mm'));
    $('[data-component=clock] .clock-seconds').html(moment().format('ss'));

    var timeout = 1000 - (new Date()).getMilliseconds();
    setTimeout(updateClock, timeout);
  };

  return {
    init: function() {
      $('[data-component=clock]').html(template());

      updateClock();
    }
  }
}
