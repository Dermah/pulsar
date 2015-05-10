var Drawing = function (pulse) {
  pulse.position = 0;
  console.log(pulse);
  
  this.pulse = pulse;
};

Drawing.prototype.draw = function (p) {
  this.pulse.windowWidth = p.windowWidth;
  p.ellipse(this.pulse.position, p.windowHeight/2, 100, 100);

  this.pulse.position += 50;
  
};

Drawing.prototype.done = function () {
  if (this.pulse.position > this.pulse.windowWidth) {
    return true;
  } else {
    return false;
  }
}

module.exports = Drawing;