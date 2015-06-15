var Transmitter = function (config) {

  var router = require('./router.js');
  router(config);

  var io = require('socket.io')(router.server);
  // Socket.io connection handling 
  io.on('connection', function(socket){
    console.log('PULSAR: client connected');
    socket.on('disconnect', function() {
      console.log('PULSAR: client disconnected');
    });
  });

  var Processor = require('./key-processor.js');
  var processor = new Processor(io, config);

  // Set up keypress detection in stdin
  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');

  stdin.on( 'data', processor.process);
}

module.exports = Transmitter;