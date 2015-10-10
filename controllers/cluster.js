var ClusterController = function ClusterController() {};
var ClusterModel = require('../models/cluster');
var BiteService = require('../services/bite_service');
var geocluster = require("geocluster");
var _ = require('lodash');

ClusterController.getClusters = function getClusters(req, res, next) {
    BiteService.getBites(10000).then(function (data) {
        var bias = 0.5;
        var clusters = geocluster(_.map(data.results, function(bite) {
            return [bite.geo.latitude, bite.geo.longitude];
        }), bias);
        var response = _.map(clusters, function (cluster) {
            return ClusterModel.createCluster(cluster.centroid, cluster.centroid, 1, cluster.elements.length);
        });

        res.json(response);
        next();
    }).catch(function (err) {
        return errorHandle(err, res, next);
    });
};

//helpers

function errorHandle(err, res, next) {
    err.statusCode = err.statusCode || 500;
    res.send(err);
    return next(false);
}

module.exports = ClusterController;
