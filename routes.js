var BiteController = require('./controllers/bite');

var API_BASE_URL = '/api/';

var ROUTE_URLS = {
  getMain: API_BASE_URL + 'main',
  createBite : API_BASE_URL + 'bites'
};

module.exports = function (server) {

  //create a bite
  server.post(ROUTE_URLS.createBite, BiteController.createBite);

};
