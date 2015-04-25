var sketch = function ( p ) {

  var receiver = require('./Receiver.js')();

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = function() {
    p.background(0);
    p.fill(0,0,220);
    p.noStroke();
    p.ellipse(p.windowWidth/2, p.windowHeight/2, 80, 80);
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}

var myp5 = new p5(sketch);