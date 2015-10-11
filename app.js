var restify = require('restify');
var config = require('./config/config.json');
var socketio = require('socket.io');


var server = restify.createServer({name: config.server.name});
var io = socketio.listen(server.server);
io.set( {origins:'herokuapp.com:* http://herokuapp.com:* http://moskito-web.herokuapp.com/:* https://moskito-web.herokuapp.com/:*'});

var port = process.env.PORT || config.server.port;

server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.CORS());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

server.on( 'after',
  function crossOrigin(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  }
);

require('./routes')(server, io);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
