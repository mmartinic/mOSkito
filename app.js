var restify = require('restify');

var server = restify.createServer();
var port = process.env.PORT || 8080;

require('./routes')(server);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
