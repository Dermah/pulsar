var jf = require('jsonfile');

var Recorder = function () {
  this.keystrokes = [];
  this.recording = false;
};


Recorder.prototype.startTimer = function() {
  var self = this;
  this.startTime = Date.now();
  this.recording = true;
}

Recorder.prototype.timeElapsed = function() {
  return (Date.now() - this.startTime)
}

Recorder.prototype.log = function (key) {
  var self = this;
  self.keystrokes.push({
    key: key,
    time: self.timeElapsed()
  });
}

Recorder.prototype.dump = function (location) {
  jf.writeFile(location, this.keystrokes, function(err) {
    if (err) {
      console.log("ERROR DUMPING KEYSTROKE LOG at " + location);
      console.log(err);
    } else {
      console.log("Dump to " + location + " complete");
    }
  });
  
}

module.exports = new Recorder();