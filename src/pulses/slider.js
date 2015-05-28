var Drawing = function (p5, pulse) {
  var defaults = {
    totalFrames: 15,
    slideFrames: 5,
    // out of 255
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

  p.rectMode(p.CORNER);
  p.fill(pulse.r, pulse.g, pulse.b);
  
  var framesIn = pulse.totalFrames - pulse.framesLeft;

  if (framesIn < pulse.slideFrames) {    
    p.rect(0, 
           p.windowHeight - p.windowHeight*(framesIn/pulse.slideFrames), 
           p.windowWidth, 
           p.windowHeight);
  } else if (framesIn > pulse.totalFrames - pulse.slideFrames) {
    p.rect(0, 
           p.windowHeight - p.windowHeight*((pulse.totalFrames - framesIn)/pulse.slideFrames), 
           p.windowWidth, 
           p.windowHeight);
  } else {
    p.rect(0, 
           0, 
           p.windowWidth, 
           p.windowHeight);
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