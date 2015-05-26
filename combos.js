var io;
var Combos = function (theIO) {
  io = theIO;
  console.log("Got");
  console.log(io);
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

Combos.prototype.flashColumn = function(row) {
  io.emit('pulse', {
    name: 'flash',
    target: {
      row: 3,
      column: 1
    }
  });
}

module.exports = Combos;