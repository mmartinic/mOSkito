var restify = require('restify');
var config = require('./config/config.json');

var server = restify.createServer({name: config.server.name});
var port = process.env.PORT || config.server.port;

require('./routes')(server);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
