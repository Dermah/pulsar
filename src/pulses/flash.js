var Drawing = function (p5, pulse) {
	var defaults = {
    framesLeft: 15,
    r: 255,
    g: 255,
    b: 255
  }
  
  p5.pulsar.merge(defaults, pulse);

	this.pulse = defaults;
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