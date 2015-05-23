var Drawing = function (pulse, config) {
  pulse.framesLeft = 1000;

  pulse.points = [];
  pulse.totalPoints = 1000;
  pulse.newPointBox = 350;

  pulse.config = config;
  this.pulse = pulse;

  // generate initial point field
  for (var currentPoint = 0; currentPoint < pulse.totalPoints; currentPoint++) {
    pulse.points[currentPoint] = this.generateNewPoint();
  }
};

Drawing.prototype.draw = function (p) {
  var self = this;
  var pulse = self.pulse;

  pulse.gridWidth = pulse.config.totalCols * p.width;
  pulse.gridHeight = pulse.config.totalRows * p.height;

  pulse.xOffset = (pulse.config.col - 1) * p.width;
  pulse.yOffset = (pulse.config.row - 2) * p.height;

  // translate the origin into the middle of the pulsar grid
  // the above offsets are then used to translate the 
  // field relative to each screen
  p.push();
  p.translate(pulse.gridWidth/2 - pulse.xOffset, pulse.gridHeight/2 + pulse.yOffset);
  for (var currentPoint = 0; currentPoint < pulse.totalPoints; currentPoint++) {
    var point = pulse.points[currentPoint];

    p.strokeWeight(4);
    p.stroke(255, currentPoint);
    p.point(point.x, point.y);

    // update point position
    pulse.points[currentPoint] = {
      x: point.x + (point.x) / 75, 
      y: point.y + (point.y) / 75
    }

    // reset position if outside the grid
    if ((point.x < -pulse.gridWidth) || (point.x > pulse.gridWidth) ||
       (point.y < -pulse.gridHeight) || (point.y > pulse.gridHeight)) {
      pulse.points[currentPoint] = this.generateNewPoint();
    }
  }
  p.pop();

  pulse.framesLeft--;
};

Drawing.prototype.generateNewPoint = function() {
  var pulse = this.pulse;
  return {
    x: Math.floor(Math.random() * (2*pulse.newPointBox)) - pulse.newPointBox,
    y: Math.floor(Math.random() * (2*pulse.newPointBox)) - pulse.newPointBox
  } 
}

Drawing.prototype.done = function () {
  if (this.pulse.framesLeft < 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = Drawing;