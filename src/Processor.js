require('./pulses/flash.js');
require('./pulses/ball.js');

var Processor = function () {};

Processor.prototype.createDrawing = function (pulse, config) {
  var Drawing = require('./pulses/' + pulse.name + '.js');
  var drawing = new Drawing(pulse, config);

  return drawing;
}

module.exports = Processor;