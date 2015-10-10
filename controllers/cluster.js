var ClusterController = function ClusterController() {};
var ClusterModel = require('../models/cluster');
var MockController = require('../controllers/mock');
var geocluster = require("geocluster");

ClusterController.getClusters = function getClusters(req, res, next) {

    var coordinates = MockController.generate();
    for(var i = 0; i < coordinates.length; i++) {
        coordinates[i] = [coordinates[i].lat, coordinates[i].long];
    }

    var bias = 1.5; // multiply stdev with this factor, the smaller the more clusters
    var clusters = geocluster(coordinates, bias);
    for(var i = 0; i < clusters.length; i++) {
        clusters[i] = ClusterModel.createCluster(clusters[i].centroid[0], clusters[i].centroid[1], 1, clusters[i].elements.length);
    }
    res.json(clusters);
    next();
};

module.exports = ClusterController;
