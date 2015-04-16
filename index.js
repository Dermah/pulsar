tty = require('tty');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/pages/index.html');
});

app.get('/two.js', function(req, res){
  res.sendFile(__dirname + '/bower_components/two/build/two.js');
});

app.get('/pulsar.js', function(req, res){
  res.sendFile(__dirname + '/pulsar.js');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    console.log("Exiting...");
    process.exit();
  } else {
    console.log("Emitting...");
    io.emit('pulsar', 'lol');
  }
});
