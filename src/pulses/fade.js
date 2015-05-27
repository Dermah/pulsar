var Drawing = function (p5, pulse) {
  var defaults = {
    totalFrames: 10,
    probability: 1,
    r: 255,
    g: 255,
    b: 255
  }

  p5.pulsar.merge(defaults, pulse);

  defaults.framesLeft = defaults.totalFrames;
  
  this.pulse = defaults;

  if (Math.random() < (1 - this.pulse.probability)) {
    this.pulse.framesLeft = 0;
  }
};

Drawing.prototype.draw = function (p) {
  var self = this;
  var pulse = self.pulse;

  var mod = 1;
  if (pulse.framesLeft >= pulse.totalFrames/2) {
    mod = 1 - (pulse.framesLeft - pulse.totalFrames/2) / (pulse.totalFrames/2);
  } else {
    mod = 1 - (pulse.totalFrames/2 - pulse.framesLeft) / (pulse.totalFrames/2);
  }

  p.rectMode(p.CORNER);
  p.fill('rgba(' + 
    pulse.r + ',' +
    pulse.g + ',' +
    pulse.b + ',' + 
    mod + ')');
  p.rect(0, 0, p.windowWidth, p.windowHeight);

  
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