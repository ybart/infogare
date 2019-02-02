var moment = require('moment');
var $ = require('jquery');

moment().format();

var updateClock = function() {
  $('.clock-time').html(moment().format('HH:mm'));
  $('.seconds').html(moment().format('ss'));

  var timeout = 1000 - (new Date()).getMilliseconds();
  setTimeout(updateClock, timeout);
};

$(function() {
  updateClock();
});
