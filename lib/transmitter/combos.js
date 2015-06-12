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

Combos.prototype.flashUpOnce = function(rate) {
  var self = this;
    setTimeout(self.flashRow,      0, 4);
    setTimeout(self.flashRow,   rate, 3);
    setTimeout(self.flashRow, 2*rate, 2);
    setTimeout(self.flashRow, 3*rate, 1);
  }

Combos.prototype.atmospheric = function (length, target) {
  var emitall = function() {
    var pulse = {
      name: 'fade',
      totalFrames: 60,
      r: Math.ceil(Math.random()*25),
      g: Math.ceil(Math.random()*25),
      b: Math.ceil(Math.random()*120),
      probability: 0.1,
      layer: true,
    }
    if (target) {
      pulse.target = target;
    }
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
    totalFrames: 1,
    a: 50,
    r: 255,
    g: 0,
    b: 0
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
    g: 50,
    b: 50
  }

  if (target) {
    pulse.target = target;
  }

  io.emit('pulse', pulse);
}

Combos.prototype.space = function(astronaut, starSize, target) {
  var pulse = {
    name: 'starfield',
  }
  if (target) {
    pulse.target = target;
  } else {
    pulse.randomColour = 3;
    pulse.strokeSize = starSize;
  }
  io.emit('pulse', pulse);
  if (astronaut) {
    var pulse = {
      name: 'astronaut',
      rotationX: (Math.random() * (2*1920/4)) - 1920/4,
      rotationY: (Math.random() * (2*1080/4)) - 1080/4,
      startRotation: (Math.random() * (4*Math.PI) - 2*Math.PI),
      finalRotation: (Math.random() * (4*Math.PI) - 2*Math.PI),
    }
    if (target) {
      pulse.target = target;
    }
    io.emit('pulse', pulse);
    astronaut = false;
  }
}

Combos.prototype.spaceUpdate = function (cols, rows, astronaut, shake, scale, target) {
  var rotationX = (Math.random() * (2*cols*1920/4)) - cols*1920/4;
  var rotationY = (Math.random() * (2*rows*1080/4)) - rows*1080/4;
  var finalRotation = ((Math.random() * (4*Math.PI)) - 2*Math.PI);
  var pulse = {
    name: 'starfield',
    rotationX: rotationX,
    rotationY: rotationY + (2*rows*1080/4),
    finalRotation: finalRotation,
    framesLeft: 1000
  }
  if (target) {
    height = Math.random() * (500) - 250;
    console.log(rotationX)

    console.log(height);
  }
  io.emit('pulse update', pulse);
  var height = rotationY;
  if (astronaut) {
    var pulse = {
      name: 'astronaut',
    }
    if (target) {
      pulse.target = target;
    }
    io.emit('pulse', pulse);
    astronaut = false;
  }
  io.emit('pulse update', {
    name: 'astronaut',
    rotationX: rotationX,
    rotationY: height,
    startRotation: (Math.random() * (4*Math.PI) - 2*Math.PI),
    finalRotation: (Math.random() * (4*Math.PI) - 2*Math.PI),
    framesLeft: 1000,
    shake: shake,
    scale: scale
  });
}
  
Combos.prototype.spaceNaut = function () {
  var pulse = {
    name: 'starburst',
  }
  io.emit('pulse', pulse);
  io.emit('pulse', {
    name: 'astronaut',
    rotationX: 600,
    rotationY: 200,
    startRotation: (Math.random() * (4*Math.PI) - 2*Math.PI),
    finalRotation: (Math.random() * (4*Math.PI) - 2*Math.PI),
    framesLeft: 1000,
  });
}

module.exports = Combos;