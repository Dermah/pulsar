var Drawing = function (p5, pulse) {
	this.p = p5;
	this.pulse = pulse;
	console.log("Something!");
};

Drawing.prototype.draw = function () {
  console.log('Drawing! ' + this.pulse);

};

module.exports = Drawing;