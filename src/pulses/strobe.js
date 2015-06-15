var Drawing = function (p5, pulse) {
  var defaults = {
    totalFrames: 100,
    framesOn: 1,
    framesOff: 1,
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

  var modFrame = pulse.framesLeft % (pulse.framesOn + pulse.framesOff);
  if (modFrame >= pulse.framesOff) {
    if (modFrame === (pulse.framesOn + pulse.framesOff - 1)) {
      if (Math.random() >= (1 - pulse.probability)) {
        pulse.on = true;
      }
    }
  } else {
    pulse.on = false;
  }

  if (pulse.on) {
    p.rectMode(p.CORNER);
    p.fill(pulse.r, pulse.g, pulse.b);
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