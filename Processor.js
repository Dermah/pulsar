var Processor = function () {};

require('./pulses/flash.js');

Processor.prototype.createDrawing = function (pulse) {
  var drawing = require('./pulses/' + pulse.name + '.js');

  return drawing;
}

module.exports = Processor;