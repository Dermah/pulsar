var io = require('socket.io-client');

var socket;

var Receiver = function (url) {
    socket = io.connect('http://localhost:3000');
};

module.exports = Receiver;