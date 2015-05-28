var jf = require('jsonfile');

var Player = function () {
};


Player.prototype.openLog = function(location) {
  this.keystrokes = jf.readFileSync(location);
  console.log(this.keystrokes);
}

Player.prototype.dump = function (location) {
  jf.writeFile(location, this.keystrokes, function(err) {
    if (err) {
      console.log("ERROR DUMPING KEYSTROKE LOG at " + location);
      console.log(err);
    } else {
      console.log("Dump to " + location + " complete");
    }
  });
  
}

module.exports = new Player();