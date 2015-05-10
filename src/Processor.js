require('./pulses/flash.js');
require('./pulses/ball.js');

var Processor = function () {};

Processor.prototype.createDrawing = function (pulse, config) {
  var Drawing = require('./pulses/' + pulse.name + '.js');
  var drawing = new Drawing(pulse, config);

  return drawing;
}

Processor.prototype.processControl = function (pulse, config) {
  if (pulse.action === 'reboot') {
    location.reload();
  }
}

module.exports = Processor;