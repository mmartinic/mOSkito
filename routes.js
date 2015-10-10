var BiteController = require('./controllers/bite');
var MockController = require('./controllers/mock');
var ClusterController = require('./controllers/cluster');

var API_BASE_URL = '/api/';

var ROUTE_URLS = {
  getMain: API_BASE_URL + 'main',
  createBite : API_BASE_URL + 'bites',
  getBites : API_BASE_URL + 'bites',
  postMock: API_BASE_URL + 'mock',
  getClusters: API_BASE_URL + 'clusters'
};

module.exports = function (server) {

  //create a bite
  server.post(ROUTE_URLS.createBite, BiteController.createBite);
  server.get(ROUTE_URLS.getBites, BiteController.getBites);
  server.post(ROUTE_URLS.postMock, MockController.postMock);
  server.get(ROUTE_URLS.getClusters, ClusterController.getClusters);

};
