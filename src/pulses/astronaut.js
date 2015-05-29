var Drawing = function (p, pulse, config) {
  var defaults = {};
  defaults.totalFrames = 1000;

  defaults.finalRotation = p.PI;

  defaults.config = config;
  defaults.gridWidth = config.totalCols * p.width;
  defaults.gridHeight = config.totalRows * p.height;

  defaults.xOffset = (config.col - 1) * p.width;
  defaults.yOffset = (config.row - 2) * p.height;

  defaults.rotationX = 0;
  defaults.rotationY = 0;

  p.pulsar.merge(defaults, pulse);

  this.pulse = defaults;

  this.pulse.framesLeft = this.pulse.totalFrames;
};

Drawing.prototype.draw = function (p) {
  var self = this;
  var pulse = self.pulse;

  // translate the origin into the middle of the pulsar grid
  // the above offsets are then used to translate the 
  // field relative to each screen

  p.push();
  p.translate(pulse.gridWidth/2 - pulse.xOffset + pulse.rotationX, pulse.gridHeight/2 - pulse.yOffset - pulse.rotationY);
  p.rotate(pulse.finalRotation * (pulse.framesLeft - pulse.totalFrames)/pulse.totalFrames);

  p.imageMode(p.CENTER);
  p.image(p.pulsar.img.astronaut, 0, 0);


  p.pop();

  pulse.framesLeft--;
};

Drawing.prototype.update = function (p, pulse, config) {
  p.pulsar.merge(this.pulse, pulse);
}

Drawing.prototype.done = function () {
  if (this.pulse.framesLeft < 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = Drawing;