var p;
var drawings = [];
var lowerLayer = [];

var DrawingManager = function (p5Sketch) {
  p = p5Sketch;
};

DrawingManager.prototype.add = function (drawing) {
  if (drawing.pulse.layer) {
    lowerLayer.unshift(drawing);
  } else {
    console.log('Added ' + drawing);
    drawings.unshift(drawing);
  }
}

DrawingManager.prototype.drawAll = function () {
  for (var i = lowerLayer.length - 1; i >= 0; i--) {
    lowerLayer[i].draw(p);

    if (lowerLayer[i].done()) {
      lowerLayer.splice(i, 1);
    }
  };

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

DrawingManager.prototype.clear = function () {
  drawings = [];
}

module.exports = DrawingManager;