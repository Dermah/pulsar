var p5 = require('p5');

var pulsar = {};
pulsar.config = pulsarConfig;
pulsarConfig = undefined;

pulsar.sketch = function (p) {

  var Receiver = require('./Receiver.js');
  var receiver = new Receiver();

  var Processor = require('./Processor.js');
  var processor = new Processor();

  var DrawingManager = require('./DrawingManager.js');
  var dM = new DrawingManager(p);

  p.setup = function() {
    p.frameRate(30);
    receiver.connect();

    receiver.on('received', function(data) {
      console.log("Pulsar: received: " + data);

      var drawing = processor.createDrawing(data, pulsar.config);

      dM.add(drawing);
      // give to drawing manager
    })

    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = function() {
    p.noStroke();
    p.background(0);

    
    dM.drawAll();

    p.textSize(15);
    p.fill(175);
    var verWidth = p.textWidth("PULSAR - v0.0.1");
    p.text("PULSAR - v0.0.1", p.windowWidth - verWidth - 10, p.windowHeight - 10);
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}

new p5(pulsar.sketch);