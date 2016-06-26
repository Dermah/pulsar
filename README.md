# PULSAR
A distributed drawing thingamajig

![Pulsar starting up on a screen](http://pulsar.dermah.org/pulsar.jpg)

PULSAR makes a grid of screens do co-ordinated stuff. It is based on the [p5 javascript drawing framework](http://p5js.org/) and [socket.io](http://socket.io).

The current setup is there is one nodejs based server that sends signals to connected clients and tells them what to do. It's hard to explain what this thing does, so watch [this video](http://youtu.be/Ccd-JkUxiU0) to see what it's capable of.

## Install

Clone this repo then

    npm install

## Build

    npm run build

This uses `webpack` to bundle all the PULSAR client-side drawing code into `dist/pulsar.js` which is served up by the web server later. You can also do

    npm run watch

to automatically build everything when you make a change

## Run

    npm start

## Configure

Rename `config-example.json` to `config.json`. Here you can specify the number of columns and rows in the PULSAR grid, and a relative path to an mp3 file that you can play on the server.

## Do stuff

Point your browser to `localhost:3000`. You can (usually, depending on network conditions) get other computers to connect as well by navigating to the server's ip address on port 3000.

In the server terminal, press some buttons and watch as everything sorta kinda flashes in time!

If you go to the base URL as above, you will automatically be redirected to be the next screen in the grid. You can manually change which grid position a screen is at by using URL arguments. For example, if you wanted to be at grid position `(2, 4)` you would use the URL

    localhost:3000/?col=2&row=4

To record your keypresses, press `}` to start recording and `{` when you are finished to write out the keypresses to `PULSARLOG.json`. To play them back, press `]` to load `PULSARLOG.json` and `[` to start playing.

Press `F8` to play the song specified in `config.json`. This cheats by using command line utilities. If you're on Windows, download [MPlayer](http://sourceforge.net/projects/mplayerwin/) and playe `mplayer.exe` in this folder.

Press `ctrl-c` to kill the server.

![A row of screens](http://pulsar.dermah.org/PULSAR2.jpg)
