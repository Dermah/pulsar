var Drawing = function (pulse, config) {
  pulse.framesLeft = 255;

  this.pulse = pulse;
};

Drawing.prototype.draw = function (p) {
  var self = this;
  var pulse = self.pulse

  var shade = 255;

  if (pulse.framesLeft > 230) {
    pulse.r = Math.random() * 255;
    pulse.g = Math.random() * 255;
    pulse.b = Math.random() * 255;
    shade = Math.random() * 50;
  } else {
    shade = pulse.framesLeft;
  }

  p.fill(pulse.r, pulse.g, pulse.b, shade);
  p.textSize(100);
  p.textAlign(p.CENTER);
  p.textStyle(p.BOLD);
  p.text("PULSAR", p.windowWidth/2, p.windowHeight/2);

  p.fill(shade);
  p.textSize(15);
  p.textStyle(p.NORMAL);
  p.text("v" + pulse.version, p.windowWidth/2, p.windowHeight/2 + 20);
  pulse.framesLeft -= 2;
};

Drawing.prototype.done = function () {
  if (this.pulse.framesLeft < 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = Drawing;