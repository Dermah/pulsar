var Drawing = function (p5, pulse) {
  var defaults = {
    totalFrames: 15,
    // out of 255
    r: 255,
    g: 255,
    b: 255, 
    // out of 1 with respect to screen size
    x: 0.5,
    y: 0.5,
    w: 1,
    h: 0.2
  }

  p5.pulsar.merge(defaults, pulse);

  defaults.framesLeft = defaults.totalFrames;
  
  this.pulse = defaults;
};

Drawing.prototype.draw = function (p) {
  var self = this;
  var pulse = self.pulse;

  p.rectMode(p.CENTER);

  p.fill('rgba(' + 
    pulse.r + ',' +
    pulse.g + ',' +
    pulse.b + ',' + 
    ((pulse.framesLeft)/pulse.totalFrames) + ')');
  
  p.rect(pulse.x* p.windowWidth, 
         pulse.y*p.windowHeight, 
         pulse.w*p.windowWidth, 
         pulse.h*p.windowHeight);

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