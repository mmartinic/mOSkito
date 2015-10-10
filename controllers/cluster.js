var ClusterController = function ClusterController() {};
var ClusterModel = require('../models/cluster');
var BiteService = require('../services/bite_service');
var geocluster = require("geocluster");
var _ = require('lodash');
var Stats = require('fast-stats').Stats;

ClusterController.getClusters = function getClusters(req, res, next) {
    BiteService.getBites(10000).then(function (data) {
        var bias = 1.5;
        var clusters = geocluster(_.map(data.results, function(bite) {
            return [bite.geo.latitude, bite.geo.longitude];
        }), bias);

        var response = _.map(clusters, function (cluster) {
            var distanceSet = new Stats();

            _.map(cluster.elements, function(element){
                return dist(element[0], element[1], cluster.centroid[0], cluster.centroid[1]);
            }).forEach(function(distance) {
                distanceSet.push(distance);
            });

            var distanceSetFiltered = distanceSet.iqr();

            var radius = distanceSetFiltered.max;

            return ClusterModel.createCluster(cluster.centroid[0], cluster.centroid[1], radius, cluster.elements.length);
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

// geodetic distance approximation
function dist(lat1, lon1, lat2, lon2) {
    var dlat = (lat2 - lat1).toRad();
    var dlon = (lon2 - lon1).toRad();
    var a = (Math.sin(dlat/2) * Math.sin(dlat/2) + Math.sin(dlon/2) * Math.sin(dlon/2) * Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()));
    return (Math.round(((2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))) * 6371)*100)/100);
}

module.exports = ClusterController;
