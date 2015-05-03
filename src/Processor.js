require('./pulses/flash.js');

var Processor = function () {};


Processor.prototype.createDrawing = function (pulse) {
  var Drawing = require('./pulses/' + pulse.name + '.js');
  var drawing = new Drawing(pulse);

  return drawing;
}

module.exports = Processor;