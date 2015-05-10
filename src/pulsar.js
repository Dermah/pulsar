var pulsar = require('../package.json');
var p5 = require('p5');
var p5sound = require('../node_modules/p5/lib/addons/p5.sound.js');

pulsar.config = pulsarConfig;
pulsarConfig = undefined;

pulsar.sketch = function (p) {
  var Receiver = require('./Receiver.js');
  var receiver = new Receiver();

  var Processor = require('./Processor.js');
  var processor = new Processor();

  var DrawingManager = require('./DrawingManager.js');
  var dM = new DrawingManager(p);

  var versionTag = pulsar.name.toUpperCase() + " - v" + pulsar.version;

  p.preload = function () {

  }

  p.setup = function() {
    p.frameRate(30);
    receiver.connect();

    receiver.on('pulse', function(data) {
      console.log("Pulsar: received: " + data);
      var drawing = processor.createDrawing(data, pulsar.config);
      dM.add(drawing);
    });

    receiver.on('pulsar control', function(data) {
      console.log("Pulsar: received: " + data);
      processor.processControl(data, pulsar.config);
    });

    p.createCanvas(p.windowWidth, p.windowHeight);

    dM.add(processor.createDrawing({name: 'pulsar-splash', version: pulsar.version}));
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