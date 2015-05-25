var Drawing = function (p5, pulse) {
  var defaults = {
    totalFrames: 15,
    framesOn: 2,
    framesOff: 2,
    probability: 1,
    r: 255,
    g: 255,
    b: 255
  }

  p5.pulsar.merge(defaults, pulse);

  defaults.framesLeft = defaults.totalFrames;
  
  this.pulse = defaults;
};

Drawing.prototype.draw = function (p) {
  var self = this;
  var pulse = self.pulse;

  if (pulse.framesLeft % 2 === 0) {
    p.rectMode(p.CORNER);
    p.fill('rgba(' + 
      pulse.r + ',' +
      pulse.g + ',' +
      pulse.b + ',' + 
      ((pulse.framesLeft)/pulse.totalFrames) + ')');
    p.rect(0, 0, p.windowWidth, p.windowHeight);
  }
  
  pulse.framesLeft--;
  
};

Drawing.prototype.done = function () {
  if (this.pulse.framesLeft < 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = Drawing;