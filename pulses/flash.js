var Drawing = function (pulse) {
	pulse.framesLeft = 15;
    console.log(pulse);
  if (!pulse.r) {
    pulse.r = 255;
  }
  if (!pulse.g) {
    pulse.g = 255;
  }
  if (!pulse.b) {
    pulse.b = 255;
  }

	this.pulse = pulse;
};

Drawing.prototype.draw = function (p) {
  p.rectMode(p.CORNER);



  p.fill('rgba(' + 
    this.pulse.r + ',' +
    this.pulse.g + ',' +
    this.pulse.b + ',' + 
    ((this.pulse.framesLeft)/15) + ')');
  
  p.rect(0, 0, p.windowWidth, p.windowHeight);

  this.pulse.framesLeft--;
  
};

Drawing.prototype.done = function () {
  if (this.pulse.framesLeft < 0) {
  	return true;
  } else {
    return false;
  }
}

module.exports = Drawing;