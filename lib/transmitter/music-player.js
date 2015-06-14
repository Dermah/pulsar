// Music player requires
var child = require('child_process');

var Player = function (songPath) {
  this.songPath = songPath;
  console.log("Going to open song file " + songPath);
}

Player.prototype.play = function () {
  if (process.platform == 'darwin') {
    Player.song = child.exec("afplay " + this.songPath, function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  } else if (process.platform == 'win32') {
    Player.song = child.exec("mplayer.exe -quiet " + this.songPath, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    })
  } else {
    console.error("Haven't got music playing working on other platforms yet sorry :(");
  }
} 

module.exports = Player;