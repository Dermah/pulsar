var events = require("events");
var io = require('socket.io-client');

var Receiver = function () {};
Receiver.prototype = new events.EventEmitter;

Receiver.prototype.connect = function() {
  var self = this;
  var socket = io.connect(window.location.href);
  console.log('Connected to socket server: ' + window.location.href);
  
  socket.on('pulse', function(data) {
    console.log('Receiver: Received pulse');
    self.emit('pulse', data);
  });

  socket.on('pulsar control', function(data) {
    console.log('Receiver: Received control pulse');
    self.emit('pulsar control', data);
  });
}

module.exports = Receiver;