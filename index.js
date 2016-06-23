// Server side definition of what the PULSAR
// grid looks like (how many rows and columns)
let config = require('./config.json');

let Input = require('@dermah/pulsar-input-keyboard');
let Detector = require('@dermah/pulsar-transmitter');

let input = new Input(config);
let detector = new Detector(config);

input.on('pulse', pulse => {
  detector.detect('pulse', pulse);
});
input.on('pulsar control', pulse => {
  detector.detect('pulsar control', pulse);
});
input.on('pulse update', pulse => {
  detector.detect('pulse update', pulse);
});
