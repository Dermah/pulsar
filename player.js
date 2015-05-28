var jf = require('jsonfile');
var events = require("events");

var Player = function () {
};

Player.prototype = new events.EventEmitter;

Player.prototype.openLog = function(location) {
  this.keystrokes = jf.readFileSync(location);
}

Player.prototype.play = function () {
  var self = this;
  for (var i = 0; i < self.keystrokes.length; i++) {
    var key = self.keystrokes[i].key;
    setTimeout(function(key) {
      self.emit('press', key);
    }, self.keystrokes[i].time, key);
  };
}

module.exports = new Player();