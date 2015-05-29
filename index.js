var tty = require('tty');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Combos = require('./combos.js');
var combo = new Combos(io);
var child = require('child_process');
var recorder = require('./recorder.js');
var player = require('./player.js');

var nextId = 0;
var songPath = "./starkeyShort.mp3"
var song;

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

app.get('/astronaut.gif', function(req, res){
  res.sendFile(__dirname + '/astronaut.gif');
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

var processKey = function( key ){
  if ( recorder.recording ) {
    if ( key !== '[' &&
         key !== ']' && 
         key !== '{' &&
         key !== '}') {
      recorder.log(key);
    }
  }
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    console.log("PULSAR: Exiting...");
    if (song) {
      song.kill("SIGTERM");
    }
    process.exit();
  } else if ( key === 'c') {
    console.log("PULSAR: Random colour...");
    combo.randomFlash();
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
  } else if ( key === '0' ) {
    combo.flashRow(4);
  } else if ( key === '1' ) {
    combo.flashRow(3);
  } else if ( key === '4' ) {
    combo.flashRow(2);
  } else if ( key === '7' ) {
    combo.flashRow(1);
  } else if ( key === '5' ) {
    combo.flashUp(200);
  } else if ( key === 's' ) {
    console.log("PULSAR: Sending starburst ****");
    io.emit('pulse', {
      name: 'starburst',
    });
  } else if ( key === 'l' ) {
    console.log("PULSAR: Sending gloc");
    io.emit('pulse', {
      name: 'bars',
      h: 0.33,
      w: 1,
      y: 0.17,
      r: 23,
      g: 16,
      b: 200
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
      rotationX: (Math.random() * (4000)) - 250,
      rotationY: (Math.random() * (4000)) - 250,
      finalRotation: (Math.random() * (4*Math.PI) - Math.PI),
      framesLeft: 1000
    });
  } else if ( key === '=' ) {
    console.log("PULSAR: Strobing");
    io.emit('pulse', {
      name: 'strobe',
      probability: 0.1
    });
  } else if ( key === '}' ) {
    console.log("PULSAR: Starting timer");
    recorder.startTimer();
  } else if ( key === '{' ) {
    recorder.dump('./PULSARLOG.json');
  } else if ( key === ']' ) {
    console.log("PULSAR: Loading from file");
    player.openLog('./PULSARLOG.json');
    recorder.startTimer();
  } else if ( key === '[' ) {
    console.log("PULSAR: Playing from file");
    player.play();
  } else if ( key === '\u001b[18~' ) {
    console.log("PULSAR: PLAYING AUDIO");
    if (process.platform == 'darwin') {
      song = child.exec("afplay " + songPath, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
    } else if (process.platform == 'win32') {
      song = child.exec("mplayer.exe -quiet " + songPath, function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
      })
    }
  }
  else if ( key === ' ' ) {
    // Atmos quiet intro
    console.log("PULSAR: Sending atmos");
    combo.atmospheric(40000);
  } else if ( key === 'B' ) {
    // Atmos quiet intro
    console.log("PULSAR: Sending gloc");
    combo.glock3(3);
  } else if ( key === 'N' ) {
    // Atmos quiet intro
    console.log("PULSAR: Sending gloc");
    combo.glock3(2);
  } else if ( key === 'M' ) {
    // Atmos quiet intro
    console.log("PULSAR: Sending gloc");
    combo.glock3(1);
  } else if ( key === 'K' ) {
    // Breathing style slide pulse
    combo.slideUpDouble();
  } else if ( key === '-' ) {
    // Breathing style slide pulse
    combo.calmBeforeStorm();
  } else {
    console.log("PULSAR: Flashing... (pressed " + key + ")");
    io.emit('pulse', {name: 'flash'});
  }
}

stdin.on( 'data', processKey);
player.on( 'press', processKey);
