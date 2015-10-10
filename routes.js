var BiteController = require('./controllers/bite');
var MockController = require('./controllers/mock');
var ClusterController = require('./controllers/cluster');
var TrapController = require('./controllers/trap');

var API_BASE_URL = '/api/';

var ROUTE_URLS = {
  getMain: API_BASE_URL + 'main',
  createBite : API_BASE_URL + 'bites',
  getBites : API_BASE_URL + 'bites',
  postMock: API_BASE_URL + 'mock',
  getClusters: API_BASE_URL + 'clusters',
  getTraps : API_BASE_URL + 'traps',
  getTrap : API_BASE_URL + 'traps/:id',
  deleteTrap : API_BASE_URL + 'traps/:id',
  updateTrap : API_BASE_URL + 'traps/:id',
  createTrap : API_BASE_URL + 'traps'
};

module.exports = function (server) {

  //create a bite
  server.post(ROUTE_URLS.createBite, BiteController.createBite);
  server.get(ROUTE_URLS.getBites, BiteController.getBites);
  server.post(ROUTE_URLS.postMock, MockController.postMock);
  server.get(ROUTE_URLS.getClusters, ClusterController.getClusters);
  server.get(ROUTE_URLS.getTraps, TrapController.getTraps);
  server.get(ROUTE_URLS.getTrap, TrapController.getTrap);
  server.post(ROUTE_URLS.createTrap, TrapController.createTrap);
  server.del(ROUTE_URLS.deleteTrap, TrapController.deleteTrap);
  server.put(ROUTE_URLS.updateTrap, TrapController.updateTrap);

};
