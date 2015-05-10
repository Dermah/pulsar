require('./pulses/flash.js');
require('./pulses/ball.js');
require('./pulses/pulsar-splash.js');

var Processor = function () {};

Processor.prototype.createDrawing = function (pulse, config, p) {
  var Drawing = require('./pulses/' + pulse.name + '.js');
  var drawing = new Drawing(pulse, config, p);

  return drawing;
}

Processor.prototype.processControl = function (pulse, config) {
  if (pulse.action === 'reboot') {
    location.reload();
  }
}

module.exports = Processor;