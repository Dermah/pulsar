var tty = require('tty');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var nextId = 0;

app.set('views', './pages');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  var totalCols = 6;
  var totalRows = 4;

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
    config.col = parseInt(req.query.col);
    config.row = parseInt(req.query.row);
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
  } else if ( key === 'w') {
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
  } else if ( key === '1' ) {
    io.emit('pulse', {
      name: 'flash',
      target: {
        row: 1
      }
    });
  } else if ( key === '4' ) {
    io.emit('pulse', {
      name: 'flash',
      target: {
        row: 2
      }
    });
  } else if ( key === '2' ) {
    io.emit('pulse', {
      name: 'flash',
      target: {
        col: 2
      }
    });
  } else if ( key === 's' ) {
    console.log("PULSAR: Sending starburst ****");
    io.emit('pulse', {
      name: 'starburst',
      framesLeft: 3000
    });
  } else if ( key === '.' ) {
    console.log("PULSAR: Sending starfield *");
    io.emit('pulse', {
      name: 'starfield',
    });
  } else if ( key === ',' ) {
    console.log("PULSAR: UPDATING STARFIELD *");
    io.emit('pulse update', {
      name: 'starfield',
      rotationX: (Math.random() * (500)) - 250 ,
      rotationY: (Math.random() * (500)) - 250,
    });
  } else {
    console.log("PULSAR: Flashing... (pressed " + key + ")");
    io.emit('pulse', {name: 'flash'});
  }
});
