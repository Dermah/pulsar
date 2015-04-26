var p;
var drawings = [];

var DrawingManager = function (p5Sketch) {
  p = p5Sketch;
};

DrawingManager.prototype.add = function (pulse) {
  console.log('Added ' + pulse);
  drawings.push(pulse);
}

DrawingManager.prototype.drawAll = function () {

}

module.exports = DrawingManager;