# PULSAR
A distributed drawing thingamajig

![A row of screens](http://pulsar.dermah.org/headerimg.jpg)

PULSAR makes a grid of screens do co-ordinated stuff. It is based on the [p5 javascript drawing framework](http://p5js.org/) and [socket.io](http://socket.io)

## Install

Clone this repo then

    npm install

## Build

You will need grunt installed globally by doing

    npm install grunt-cli -g

then you can build by doing

    grunt build

## Run

    node index.js

## Do stuff

Point your browser to `localhost:3000`. You can (usually, depending on network conditions) get other computers to connect as well by navigating to the server's ip address on port 3000. 

In the terminal window, press some buttons and watch as everything sorta kinda flashes in time!

Press `ctrl-c` to kill the server.

If you go to the base URL, you will automatically be configured to be the next screen in the grid. You can manually change which grid position a screen is at by using URL arguments. For example, if you wanted to be at grid position `(2, 4)` you would use the URL

    localhost:3000/?col=2&row=4

## Make your own drawings

To make your own drawings, you need to build a class with a prototype like this:

```JavaScript
var Drawing = function (pulse) {
  // the pulse object contains information to customise the drawing
  // this drawing will only be used if pulse.name === name-of-drawing
  // This prototype must be saved at src/pulses/name-of-drawing.js
  // Do your setup stuff here
};
Drawing.prototype.draw = function (p) {
  // p is the p5 object. This function is called every frame. 
  // Do all your frme by frame drawing here.
};
Drawing.prototype.done = function () {
  return true;
  // Return true if this drawing is finished. It will then be cleaned up by
  // the drawing manager. Otherwise return false if you want to keep drawing frames
}
module.exports = Drawing;
```

To have the drawing activated on client machines, get `index.js` to emit a `pulsar` io event. If you wanted to activate the `flash` drawing you would do:

```JavaScript
io.emit('pulse', { 
  name: 'flash',
  // Other configuration options here.
  // This whole object is passed to the 
  // drawing constructor
});
```

Make sure the drawing is referenced in `Processor.js` or browserify will not include it. 

```JavaScript
require('./pulses/name-of-drawing.js');
```