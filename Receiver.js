var events = require("events");
var io = require('socket.io-client');

var Receiver = function () {};
Receiver.prototype = new events.EventEmitter;

Receiver.prototype.connect = function() {
    
  var self = this;
  var socket = io.connect(window.location.href);
  console.log('Connected to socket server');
  
  socket.on('pulse', function(data) {
    console.log('Receiver: Received pulse');
    self.emit('received', data);
  });
}

module.exports = Receiver;