var p;
var drawings = [];

var DrawingManager = function (p5Sketch) {
  p = p5Sketch;
};

DrawingManager.prototype.add = function (drawing) {
  console.log('Added ' + drawing);
  drawings.unshift(drawing);
}

DrawingManager.prototype.drawAll = function () {
  for (var i = drawings.length - 1; i >= 0; i--) {
    drawings[i].draw(p);

    if (drawings[i].done()) {
      drawings.splice(i, 1);
      i--;
    }
  };
}

module.exports = DrawingManager;