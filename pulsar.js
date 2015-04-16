var two = new Two({
  type: Two.Types.webgl,
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

var socket = io();

var rect = two.makeRectangle(two.width / 2, two.height / 2, 50 ,50);
two.bind('update', function() {
  rect.rotation += 0.001;
});

socket.on('pulsar', function(msg) {
  var newRect = two.makeRectangle(two.width * Math.random(), two.height * Math.random(), 50, 50);
  console.log("Rec: " + msg);
});
