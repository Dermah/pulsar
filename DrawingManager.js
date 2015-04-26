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
  for (var i = drawings.length - 1; i >= 0; i--) {
    drawings[i].draw(p);
  };
}

module.exports = DrawingManager;