var socket;

function setup() {
  socket = io.connect('http://localhost:3000');
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  fill(0,0,255);
  noStroke();
  ellipse(12, 40, 80, 80);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}