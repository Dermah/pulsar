// Web server and communication requires
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Console server control requires
var tty = require('tty');

// Music player requires
var child = require('child_process');

// Pulsar utility requires
var Combos = require('./combos.js');
var combo = new Combos(io);
var recorder = require('./recorder.js');
var player = require('./player.js');

// Global-ish variables that shouldn't be global 
// and will be fixed later right?
var nextId = 0;
var songPath = "./song.mp3"
var song;
var astronautOn = false;
var currentTarget = undefined;
var shake = 0;

// Server side definition of what the PULSAR 
// grid looks like (how many rows and columns)
var totalCols = 6;
var totalRows = 4;

// Use jade page template thing
app.set('views', './pages');
app.set('view engine', 'jade');

app.get('/', function(req, res){

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
    combo.randomFlash(currentTarget);
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
    combo.space(astronautOn, 16, currentTarget);
    astronautOn = false;
  } else if ( key === ',' ) {
    console.log("PULSAR: UPDATING STARFIELD *");
    combo.spaceUpdate(totalCols, totalRows, astronautOn, 0, 1, currentTarget);
    astronautOn = false;
  } else if ( key === '=' ) {
    var pulse = {
      name: 'strobe',
      probability: 0.1
    }
    if (currentTarget) {
      pulse.target = currentTarget;
    }
    console.log("PULSAR: Strobing");
    io.emit('pulse', pulse);
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
    combo.atmospheric(25000, currentTarget);
  } else if ( key === 'B' ) {
    // Atmos quiet intro
    console.log("PULSAR: Sending gloc");
    combo.glock3(3, currentTarget);
  } else if ( key === 'N' ) {
    // Atmos quiet intro
    console.log("PULSAR: Sending gloc");
    combo.glock3(2, currentTarget);
  } else if ( key === 'M' ) {
    // Atmos quiet intro
    console.log("PULSAR: Sending gloc");
    combo.glock3(1, currentTarget);
  } else if ( key === 'K' ) {
    // Breathing style slide pulse
    combo.slideUpDouble(currentTarget);
  } else if ( key === '-' ) {
    // Breathing style slide pulse
    combo.calmBeforeStorm(currentTarget);
  } else if (key === '/' ) {
    astronautOn = true;
  } else if (key === 'J' ) {
    io.emit('pulse', {
      name: 'slider',
      r: 255,
      g: 0,
      b: 0,
      totalFrames: 51,
      slideFrames: 51
    });
  } else if (key === '\b' ) {
    console.log("PULSAR: Delete all drawings");
    io.emit('pulsar control', {action: "clear"});
  } else if (key === '3' ) {
    console.log("Row 4 only");
    currentTarget = {row: 4};
  } else if (key === '6' ) {
    console.log("Everywhere");
    currentTarget = undefined;
  } else if ( key === '>' ) {
    console.log("PULSAR: Sending starfield *");
    combo.space(true, 60, currentTarget);
  } else if ( key === '<' ) {
    shake = 0;
    console.log("PULSAR: Sending starfield *");
    combo.space(true, 2000, currentTarget);
  } else if ( key === 'P' ) {
    console.log("PULSAR: UPDATING STARFIELD *");
    combo.spaceUpdate(totalCols, totalRows, false, shake, 1, currentTarget);
    astronautOn = false;
    if (shake === 0) {
      shake = 1;
    }
    shake = shake*2;
  } else if ( key === 'O' ) {
    console.log("PULSAR: UPDATING STARFIELD *");
    combo.spaceUpdate(totalCols, totalRows, false, shake, 6, currentTarget);
    astronautOn = false;
    if (shake === 0) {
      shake = 1;
    }
    shake = shake*2;
  } else if ( key === 'U' ) {
    combo.flashUpOnce(75);
  } else if ( key === '!' ) {
    combo.spaceNaut();
  } else {
    console.log("PULSAR: Flashing... (pressed " + key + ")");
    var pulse = {name: 'flash'};
    if (currentTarget) {
      pulse.target = currentTarget;
    }
    io.emit('pulse', pulse);
  }
}

stdin.on( 'data', processKey);
player.on( 'press', processKey);
