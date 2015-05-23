var pulsar = require('../package.json');
var p5 = require('p5');

pulsar.config = pulsarInitConfig;
pulsarInitConfig = undefined;

// pulsar utils
p5.pulsar = {};
p5.pulsar.merge = function(defaults, pulse) {
  for (var attribute in pulse) { 
    defaults[attribute] = pulse[attribute]; 
  }
}

pulsar.sketch = function (p) {

  var Receiver = require('./Receiver.js');
  var receiver = new Receiver();

  var Processor = require('./Processor.js');
  var processor = new Processor();

  var DrawingManager = require('./DrawingManager.js');
  var dM = new DrawingManager(p);

  var versionTag = pulsar.name.toUpperCase() + "(" + pulsar.config.col + ", " + pulsar.config.row + ") - v" + pulsar.version;

  p.setup = function() {
    p.frameRate(30);
    receiver.connect();

    receiver.on('pulse', function(data) {
      console.log("Pulsar: received: " + data);
      var drawing = processor.createDrawing(p5, data, pulsar.config);
      if (drawing) {
        dM.add(drawing);
      }
    });

    receiver.on('pulsar control', function(data) {
      console.log("Pulsar: received: " + data);
      processor.processControl(data, pulsar.config);
    });

    p.createCanvas(p.windowWidth, p.windowHeight);

    dM.add(processor.createDrawing(p5, {name: 'pulsar-splash', version: pulsar.version}));
  }

  p.draw = function() {
    p.noStroke();
    p.background(0);

    
    dM.drawAll();

    p.textSize(15);
    p.fill(175);
    p.textAlign(p.LEFT);
    var verWidth = p.textWidth(versionTag);
    p.text(versionTag, p.windowWidth - verWidth - 10, p.windowHeight - 10);
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}

new p5(pulsar.sketch);