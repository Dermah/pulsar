var Drawing = function (pulse, config, p) {
  pulse.sound = p.loadSound('splash.mp3');

  pulse.framesLeft = 300 + (Math.random() * 75);
  pulse.r = Math.random() * 255;
  pulse.g = Math.random() * 255;
  pulse.b = Math.random() * 255;
  pulse.shade = 0;
  pulse.played = false;

  this.pulse = pulse;
};

Drawing.prototype.draw = function (p) {
  var self = this;
  var pulse = self.pulse

  if (pulse.framesLeft > 256) {
    pulse.r = Math.random() * 255;
    pulse.g = Math.random() * 255;
    pulse.b = Math.random() * 255;
    pulse.shade += 2;
  } else {
    pulse.shade = pulse.framesLeft;
    if (!pulse.played) {
      pulse.sound.play();
      pulse.played = true;
    }
  }

  p.fill(pulse.r, pulse.g, pulse.b, pulse.shade);
  p.textSize(100);
  p.textAlign(p.CENTER);
  p.textStyle(p.BOLD);
  p.text("PULSAR", p.windowWidth/2, p.windowHeight/2);

  p.fill(pulse.shade);
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