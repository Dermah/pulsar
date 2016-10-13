let Input = require('@dermah/pulsar-transmitter');
let Detector = require('@dermah/pulsar-transmitter');

let input = new Input({
  songPath: './song.mp3',
  totalCols: 2,
  totalRows: 2,
  module: '@dermah/pulsar-vj',
  port: 3001
});

let detector = new Detector({
  songPath: './song.mp3',
  totalCols: 2,
  totalRows: 2,
  module: '@dermah/pulsar-detector-p5',
  port: 3000
});

input.on('pulse', pulse => {
  detector.detect('pulse', pulse);
});
input.on('pulsar control', pulse => {
  detector.detect('pulsar control', pulse);
});
input.on('pulse update', pulse => {
  detector.detect('pulse update', pulse);
});
