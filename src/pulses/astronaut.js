var Drawing = function (p, pulse, config) {
  var defaults = {};
  defaults.totalFrames = 1000;

  defaults.startRotation = 0;
  defaults.finalRotation = p.PI;

  defaults.scale = 1;

  defaults.shake = 0;

  defaults.config = {};
  defaults.config.totalCols = config.totalCols;
  defaults.config.totalRows = config.totalRows;
  defaults.config.row = config.row;
  defaults.config.col = config.col;

  if (pulse.target) {
    if (pulse.target.col) {
      defaults.config.totalCols = 1;
      defaults.config.col = 1;
    }
    if (pulse.target.row) {
      defaults.config.totalRows = 1;
      defaults.config.row = 1;
    }
  }

  defaults.gridWidth = defaults.config.totalCols * p.width;
  defaults.gridHeight = defaults.config.totalRows * p.height;

  defaults.xOffset = (defaults.config.col - 1) * p.width;
  defaults.yOffset = (defaults.config.row - 1) * p.height;

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

  var shakeX = Math.random() * pulse.shake;
  var shakeY = Math.random() * pulse.shake;

  p.push();
  p.translate(pulse.gridWidth/2 - pulse.xOffset + pulse.rotationX + shakeX, 
    pulse.gridHeight/2 - pulse.yOffset - pulse.rotationY + shakeY);
  p.rotate(pulse.startRotation + pulse.finalRotation * (pulse.framesLeft - pulse.totalFrames)/pulse.totalFrames);
  p.scale(pulse.scale, pulse.scale);
  
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