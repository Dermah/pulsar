var tty = require('tty');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var nextId = 0;

app.set('views', './pages');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  var totalCols = 4;
  var totalRows = 2;

  var config = {
    id: nextId,
    totalCols: totalCols,
    totalRows: totalRows,
    col: (nextId % totalCols) + 1,
    row: Math.floor(nextId/totalCols) + 1
  };
  
  if (!req.query.col || !req.query.row) {
    res.redirect(302, "/?col=" + config.col + "&row=" + config.row);
    console.log("SERVER: Sent redirect to col: " + config.col + " row: " + config.row);
    nextId++;
  } else {
    config.col = req.query.col;
    config.row = req.query.row;
    res.render('index', { config: JSON.stringify(config) } );
    console.log("SERVER: Sent PULSAR to : " + config.col + " row: " + config.row);
  }
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
  } else if ( key === '\u0012' ) {
    console.log();
    console.log("PULSAR REBOOTING");
    console.log();
    io.emit('pulsar control', {action: "reboot"});
  } else {
    console.log("PULSAR: Flashing... (pressed " + key + ")");
    io.emit('pulse', {name: 'flash'});
  }
});
