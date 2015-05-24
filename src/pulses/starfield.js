var Drawing = function (p, pulse, config) {
  var defaults = {};
  defaults.totalFrames = 1000;

  defaults.points = [];
  defaults.totalPoints = 1000;

  defaults.finalRotation = p.PI;

  defaults.config = config;
  defaults.gridWidth = config.totalCols * p.width;
  defaults.gridHeight = config.totalRows * p.height;
  
  defaults.longEdge = defaults.gridWidth;
  if (defaults.gridHeight > defaults.longEdge) defaults.longEdge = gridHeight;

  defaults.xOffset = (config.col - 1) * p.width;
  defaults.yOffset = (config.row - 2) * p.height;

  defaults.rotationX = 0;
  defaults.rotationY = 0;

  p.pulsar.merge(defaults, pulse);

  this.pulse = defaults;

  this.pulse.framesLeft = this.pulse.totalFrames;

  // generate initial point field
  for (var currentPoint = 0; currentPoint < this.pulse.totalPoints; currentPoint++) {
    this.pulse.points[currentPoint] = this.generateNewPoint();
  }
};

Drawing.prototype.draw = function (p) {
  var self = this;
  var pulse = self.pulse;

  // translate the origin into the middle of the pulsar grid
  // the above offsets are then used to translate the 
  // field relative to each screen

  p.push();
  p.translate(pulse.gridWidth/2 - pulse.xOffset + pulse.rotationX, pulse.gridHeight/2 + pulse.yOffset + pulse.rotationY);
  p.rotate(pulse.finalRotation * (pulse.framesLeft - pulse.totalFrames)/pulse.totalFrames);

  for (var currentPoint = 0; currentPoint < pulse.totalPoints; currentPoint++) {
    var point = pulse.points[currentPoint];

    p.strokeWeight(4);
    p.stroke(255, currentPoint);
    p.point(point.x, point.y);
  }
  p.pop();

  pulse.framesLeft--;
};

Drawing.prototype.generateNewPoint = function() {
  var pulse = this.pulse;
  return {
    x: Math.floor(Math.random() * (2*(pulse.longEdge))) - (pulse.longEdge),
    y: Math.floor(Math.random() * (2*(pulse.longEdge))) - (pulse.longEdge)
  } 
}

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