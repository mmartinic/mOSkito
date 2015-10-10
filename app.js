var restify = require('restify');

var server = restify.createServer();

require('./routes')(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});