var io;
var Combos = function (theIO) {
  io = theIO;
};

Combos.prototype.randomFlash = function() {
  io.emit('pulse',  { 
    name: 'flash',
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
  });
}

Combos.prototype.flashRow = function(row) {
  io.emit('pulse', {
    name: 'flash',
    target: {
      row: row
    }
  });
}

Combos.prototype.flashColumn = function(column) {
  io.emit('pulse', {
    name: 'flash',
    target: {
      col: column
    }
  });
}

Combos.prototype.flashUp = function(rate) {
  var self = this;
  var march = function(rate) {
    setTimeout(self.flashRow,      0, 1);
    setTimeout(self.flashRow,   rate, 2);
    setTimeout(self.flashRow, 2*rate, 3);
    setTimeout(self.flashRow, 3*rate, 4);
  };
  march(rate);
  setInterval(march, 4*rate, rate);
}

Combos.prototype.atmospheric = function () {
  var emitall = function() {
    io.emit('pulse', {
      name: 'fade',
      totalFrames: 12,
      r: Math.ceil(Math.random()*25),
      g: Math.ceil(Math.random()*25),
      b: Math.ceil(Math.random()*120),
      probability: 0.1,
    });
  };
  emitall();
  setInterval(emitall, 40)
}

module.exports = Combos;