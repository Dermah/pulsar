var Drawing = function (pulse, config) {

  if (!pulse.totalFrames) {
    pulse.totalFrames = 50;
  }
  pulse.framesLeft = pulse.totalFrames;
  pulse.framesPerCol = pulse.totalFrames/config.totalCols;
  pulse.startFrame = (config.col - 1) * pulse.framesPerCol;
  pulse.endFrame = pulse.startFrame + pulse.framesPerCol;

  console.log(pulse);

  this.pulse = pulse;
};

Drawing.prototype.draw = function (p) {
  var self = this;
  var pulse = self.pulse;
  if (pulse.framesLeft > pulse.startFrame &&
      pulse.framesLeft < pulse.endFrame) {

    var stepWidth = p.windowWidth/(pulse.framesPerCol);
    var position = stepWidth * (pulse.framesLeft - pulse.startFrame);

    this.pulse.windowWidth = p.windowWidth;
    p.ellipse(position, p.windowHeight/2, 100, 100);

    this.pulse.position += 50;
  }
  
  pulse.framesLeft--;
};

Drawing.prototype.done = function () {
  if (this.pulse.framesLeft <= 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = Drawing;