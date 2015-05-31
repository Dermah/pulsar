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

In the server window, press some buttons and watch as everything sorta kinda flashes in time!

Press `ctrl-c` to kill the server.

If you go to the base URL, you will automatically be redirected to be the next screen in the grid. You can manually change which grid position a screen is at by using URL arguments. For example, if you wanted to be at grid position `(2, 4)` you would use the URL

    localhost:3000/?col=2&row=4

## Make your own drawings

Making your own drawings is a bit like making a [p5.js](http://p5js.org/)/[Processing](https://processing.org/) sketch. There is a setup function (called when the drawing is activated initially), and a draw function (called every frame). Additionally, PULSAR drawings expose another function that indicate whether or not they have finished drawing, allowing the whole drawing to be garbage collected. 

To make your own drawings, you need to build an object with prototype like this:

```JavaScript
// This prototype must be saved at src/pulses/name-of-drawing.js
var Drawing = function (pulse) {
  // The pulse object contains information to customise the drawing.
  // This drawing will only be used if pulse.name === name-of-drawing
  // Do your setup stuff here. For example, set up a frame counter to 
  // track how many frames this has been run for. 
  this.framesLeft = 50;
};
Drawing.prototype.draw = function (p) {
  // p is the p5 object. This function is called every frame. 
  // Do all your frame by frame drawing here.
  // If you wanted to draw a rectangle in the middle of the screen
  // you would do the following:
  p.rect(p.windowWidth/2, p.windowHeight/2, 50, 50);
  this.framesLeft--;
};
Drawing.prototype.done = function () {
  // Return true if this drawing is finished. It will then be cleaned up by
  // the drawing manager. Otherwise return false if you want to keep drawing frames
  if (this.framesLeft <= 0) {
    return true;
  } else {
    return false;
  }
}
module.exports = Drawing;
```

Make sure the drawing is referenced in `Processor.js` or browserify will not include it in the bundle. 

```JavaScript
require('./pulses/name-of-drawing.js');
```

Then, to have the drawing activated on client machines, get `index.js` to emit a `pulsar` io event.

```JavaScript
io.emit('pulse', { 
  name: 'name-of-drawing',
  // Other configuration options here.
  // This whole object is passed to the 
  // drawing constructor
});
```

![Pulsar starting up on a screen](http://pulsar.dermah.org/pulsar.jpg)