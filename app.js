var restify = require('restify');
var config = require('./config/config.json');
var socketio = require('socket.io');


var server = restify.createServer({name: config.server.name});
var io = socketio.listen(server.server);

var port = process.env.PORT || config.server.port;

server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

require('./routes')(server, io);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
