var MainController = require('./controllers/main');

var API_BASE_URL = '/api/';

var ROUTE_URLS = {
  getMain: API_BASE_URL + 'main'
};

module.exports = function (server) {

  server.get(ROUTE_URLS.getMain, MainController.getMain);

};
