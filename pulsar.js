var socket;

function setup() {
  socketSetup(socket);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  fill(0,0,220);
  noStroke();
  ellipse(windowWidth/2, windowHeight/2, 80, 80);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function socketSetup (s) {
  s = io.connect('http://localhost:3000');
}