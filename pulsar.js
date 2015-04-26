var p5 = require('p5');

var sketch = function (p) {

  var Receiver = require('./Receiver.js');
  var receiver = new Receiver();

  var DrawingManager = require('./DrawingManager.js');
  var dM = new DrawingManager(p);

  p.setup = function() {
    receiver.connect();

    receiver.on('received', function(data) {
      console.log("Pulsar: received: " + data);
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = function() {
    dM.drawAll();

    p.background(0);

    p.textSize(15);
    p.fill(150);
    p.textStyle(p.BOLD);
    var verWidth = p.textWidth("PULSAR - v0.0.1");
    p.text("PULSAR - v0.0.1", p.windowWidth - verWidth - 10, p.windowHeight - 10);
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}

var myp5 = new p5(sketch);