var BiteController = function BiteController() {
};
var BiteService = require('../services/bite_service');
var BiteModel = require('../models/bite');
var _ = require('lodash');
var restify = require('restify');

BiteController.setIo = function setIo(io){
  BiteController.io = io;
  return BiteController;
};

BiteController.createBite = function createBite(req, res, next) {

  var userId = req.params.userId || '';

  var lat = req.params.lat;

  if (!_.isNumber(lat)) {
    return next(new restify.errors.BadRequestError('latitude is not a valid number!'));
  }

  var long = req.params.long;

  if (!_.isNumber(long)) {
    return next(new restify.errors.BadRequestError('longitude is not a valid number!'));
  }

  return BiteService.saveBite(userId, lat, long)
    .then(function (response) {
      BiteController.io.emit('bite',  {lat: lat, long: long});
      res.json(response);
      next();
    })
    .catch(function (err) {
      return errorHandle(err, res, next);
    });

};

BiteController.getBites = function getBites(req, res, next) {

  var limit = req.query.limit;

  return BiteService.getBites(limit)
    .then(function (data) {
      var response =
      {
        total: data.count,
        returned: data.results ? data.results.length : 0,
        bites: _.map(data.results, BiteModel.getBite)
      };

      res.json(response);
      next();
    })
    .catch(function (err) {
      return errorHandle(err, res, next);
    });

};

//helpers

function errorHandle(err, res, next) {
  err.statusCode = err.statusCode || 500;
  res.send(err);
  return next(false);
}

module.exports = BiteController;
