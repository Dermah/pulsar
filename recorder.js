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

Recorder.prototype.dump = function () {
  console.log(this.keystrokes);
}

module.exports = new Recorder();