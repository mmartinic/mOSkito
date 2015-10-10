var BiteController = require('./controllers/bite');
var MockController = require('./controllers/mock');

var API_BASE_URL = '/api/';

var ROUTE_URLS = {
  getMain: API_BASE_URL + 'main',
  createBite : API_BASE_URL + 'bites',
  postMock: API_BASE_URL + 'mock'
};

module.exports = function (server) {

  //create a bite
  server.post(ROUTE_URLS.createBite, BiteController.createBite);
  server.post(ROUTE_URLS.postMock, MockController.postMock);

};
