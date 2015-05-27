require('./pulses/flash.js');
require('./pulses/ball.js');
require('./pulses/pulsar-splash.js');
require('./pulses/starburst.js');
require('./pulses/starfield.js');
require('./pulses/strobe.js');
require('./pulses/fade.js');

var Processor = function () {};

Processor.prototype.createDrawing = function (p5, pulse, config) {
  if (pulse.target) {
    for (var key in pulse.target) {
      if (config.hasOwnProperty(key) && config[key] === pulse.target[key]) {
        // so far so good
      } else {
        // a target property was not present on this client or
        // a target property did not match on this client
        // exiting early
        return null;
      }
    }
  }

  var Drawing = require('./pulses/' + pulse.name + '.js');
  var drawing = new Drawing(p5, pulse, config);

  return drawing;
}

Processor.prototype.processControl = function (pulse, config) {
  if (pulse.action === 'reboot') {
    location.reload();
  }
}

module.exports = Processor;