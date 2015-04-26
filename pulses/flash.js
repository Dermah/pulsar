var Drawing = function (pulse) {
	pulse.framesLeft = 600;

	this.pulse = pulse;
	console.log("Something!");
};

Drawing.prototype.draw = function (p) {
  console.log('Drawing! ' + this.pulse);

  this.pulse.framesLeft--;
  if (this.pulse.framesLeft < 0) {
  	console.log("OMG");
  }
};

module.exports = Drawing;