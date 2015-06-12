// Web server and communication requires
var app = require('express')();
var http = require('http').Server(app);

var Router = function (config) {

  http.listen(3000, function(){
    console.log('SERVER: listening on *:3000');
  });

  var nextId = 0;
  var totalCols = config.totalCols;
  var totalRows = config.totalRows;

  // Use jade page template thing
  app.set('views', './pages');
  app.set('view engine', 'jade');

  // What to do when a client connects to the server
  app.get('/', function(req, res){

    // Default configuration variables for client
    var config = {
      id: nextId,
      totalCols: totalCols,
      totalRows: totalRows,
      col: (nextId % totalCols) + 1,
      row: Math.floor(nextId/totalCols) + 1
    };
    
    // If the client has not specified where it is in the grid,
    // redirect to place it as the next in the grid
    // Otherwise, honour the request for the specified column and row
    if (!req.query.col || !req.query.row) {
      res.redirect(302, "/?col=" + config.col + "&row=" + config.row);
      console.log("SERVER: Sent redirect to col: " + config.col + " row: " + config.row);
      nextId++;
    } else {
      config.col = parseInt(req.query.col);
      config.row = parseInt(req.query.row);

      // Serve the html page, injecting configuration for pulsar.js to use
      res.render('index', { config: JSON.stringify(config) } );
      console.log("SERVER: Sent PULSAR to : " + config.col + " row: " + config.row);
    }
  });

  app.get('/pulsar.js', function(req, res){
    res.sendFile('/dist/pulsar.js', {root: "./"});
  });

  app.get('/astronaut.gif', function(req, res){
    res.sendFile('/astronaut.gif', {root: "./"});
  });

};

module.exports = Router;
module.exports.server = http;