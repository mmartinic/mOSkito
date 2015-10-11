var restify = require('restify');
var config = require('./config/config.json');
var fs = require('fs');
var socketio = require('socket.io');

var server = restify.createServer({name: config.server.name});
var io = socketio.listen(server.server);
io.set('origins',  '*:*');

var port = process.env.PORT || config.server.port;

server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

server.get(/socket[.]io[.]js$/, function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'false');

  fs.readFile('socket.io.js', function (err, file) {
    if (err) {
      console.log(err);
      res.send(500);
      return next();
    }

    res.write(file);
    res.end();
    return next();
  });

});

require('./routes')(server, io);

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
