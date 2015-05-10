var tty = require('tty');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', './pages');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  console.log(req.query);

  var config = {
    col: 1,
    row: 1,
    totalCols: 4,
    totalRows: 2
  };
  
  if (req.query.col) {
    config.col = req.query.col;
  }
  if (req.query.row) {
    config.row = req.query.col
  }

  res.render('index', { config: JSON.stringify(config) } );
});

app.get('/pulsar.js', function(req, res){
  res.sendFile(__dirname + '/dist/pulsar.js');
});

io.on('connection', function(socket){
  console.log('PULSAR: client connected');
  socket.on('disconnect', function() {
    console.log('PULSAR: client disconnected');
  });
});

http.listen(3000, function(){
  console.log('SERVER: listening on *:3000');
});

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    console.log("PULSAR: Exiting...");
    process.exit();
  } else if ( key === 'c') {
    console.log("PULSAR: Random colour...");
    io.emit('pulse', { 
      name: 'flash',
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255)
    });
  } else if ( key === 'b') {
    console.log("PULSAR: Sending ball...");
    io.emit('pulse', { 
      name: 'ball'
    });
  } else if ( key === '2') {
    console.log("PULSAR: Sending long ball...");
    io.emit('pulse', { 
      name: 'ball',
      totalFrames: 100
    });
  } else {
    console.log("PULSAR: Flashing...");
    io.emit('pulse', {name: 'flash'});
  }
});
