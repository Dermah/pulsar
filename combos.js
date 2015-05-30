var io;
var Combos = function (theIO) {
  io = theIO;
};

Combos.prototype.randomFlash = function(target) {
  var pulse = { 
    name: 'flash',
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
  }

  if (target) {
    pulse.target = target;
  }
  io.emit('pulse',  pulse);
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

Combos.prototype.atmospheric = function (length, target) {
  var pusle = {
      name: 'fade',
      totalFrames: 12,
      r: Math.ceil(Math.random()*25),
      g: Math.ceil(Math.random()*25),
      b: Math.ceil(Math.random()*120),
      probability: 0.1,
    }
  if (target) {
    pulse.target = target;
  }
  var emitall = function() {
    io.emit('pulse', pulse);
  };
  emitall();
  var atmos = setInterval(emitall, 40)
  setTimeout(clearInterval, length, atmos);
}

Combos.prototype.glock3 = function (note, target) {
  // note should be number 1 to 3

  var offset = (note - 2) * 0.333333333;

  var pulse = {
    name: 'bars',
    totalFrames: 16,
    r: (255),
    g: (200 - Math.floor(Math.random()*200)),
    b: (200 - Math.floor(Math.random()*200)),
    x: 0.5,
    w: 1,
    y: 0.5 + offset,
    h: 0.33333,
  }

  if (target) {
    pulse.target = target;
  }

  io.emit('pulse', pulse);
}

Combos.prototype.slideUpDouble = function (frames, target) {
  var pulse = {
    name: 'slider',
    totalFrames: 1
  }
  if (target) {
    pulse.target = target;
  }
  var emitter = function(frames) {
    pulse.totalFrames = frames;
    io.emit('pulse', pulse);
  }
  
  emitter(22);

  setTimeout(emitter, 750, 25);
}

Combos.prototype.calmBeforeStorm = function (target) {
  var pulse = {
    name: 'strobe',
    totalFrames: 11,
    framesOn: 10,
    probability: 0.6,
    r: 255,
    g: 100,
    b: 100
  }

  if (target) {
    pulse.target = target;
  }

  io.emit('pulse', pulse);
}

module.exports = Combos;