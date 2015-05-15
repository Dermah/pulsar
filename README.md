# PULSAR
A distributed drawing thingamajig

![A row of screens](http://pulsar.dermah.org/headerimg.jpg)

PULSAR makes a grid of screens do co-ordinated stuff. 

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