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
    }
  };
}

DrawingManager.prototype.update = function (pulse, config) {
  for (var i = drawings.length - 1; i >= 0; i--) {
    if (drawings[i].pulse.name === pulse.name) {
      drawings[i].update(p, pulse, config);
      console.log("UPDATED pulse", drawings[i].pulse.name);
    }
  }
}

module.exports = DrawingManager;