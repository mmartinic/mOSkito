var TrapController = function TrapController() {};
var TrapService = require('../services/trap_service');
var TrapModel = require('../models/trap');
var TrapState = require('../models/trap_state');
var _ = require('lodash');
var restify = require('restify');

TrapController.createTrap = function createTrap(req, res, next) {

  var creatorId = req.params.creatorId || '';

  var lat = req.params.lat;

  if (!_.isNumber(lat)) {
    return next(new restify.errors.BadRequestError('latitude is not a valid number!'));
  }

  var long = req.params.long;

  if (!_.isNumber(long)) {
    return next(new restify.errors.BadRequestError('longitude is not a valid number!'));
  }

  var trapState = req.params.state;

  if (!TrapState.isValid(trapState)) {
    return next(new restify.errors.BadRequestError(trapState + ' is not one of valid states: '  + TrapState.VALID_STATES.join(' ,')));
  }

  return TrapService
    .saveTrap(creatorId, lat, long, trapState)
    .then(function (response) {
      var createdTrap = TrapModel.getTrapFromParams(response.objectId, creatorId, lat, long, trapState);
      res.json(createdTrap);
      next();
    })
    .catch(function (err) {
      return errorHandle(err, res, next);
    });

};

TrapController.getTraps = function getTraps(req, res, next) {

  var limit = req.query.limit;
  var state = req.query.state;

  return TrapService
    .getTraps(limit, state)
    .then(function (data) {
      var response =
      {
        total: data.count,
        returned: data.results ? data.results.length : 0,
        traps: _.map(data.results, TrapModel.getTrap)
      };

      res.json(response);
      next();
    })
    .catch(function (err) {
      return errorHandle(err, res, next);
    });

};

TrapController.getTrap = function getTrap(req, res, next) {

  var id = req.params.id;

  return TrapService
    .getTrap(id)
    .then(function (data) {
      res.json(TrapModel.getTrap (data));
      next();
    })
    .catch(function (err) {
      return errorHandle(err, res, next);
    });

};

TrapController.deleteTrap = function deleteTrap(req, res, next) {

  var id = req.params.id;

  return TrapService
    .deleteTrap(id)
    .then(function (data) {
      res.send(204);
      next();
    })
    .catch(function (err) {
      return errorHandle(err, res, next);
    });

};

TrapController.updateTrap = function updateTrap(req, res, next) {

  var id = req.params.id;

  var lat = req.params.lat;

  if (lat && !_.isNumber(lat)) {
    return next(new restify.errors.BadRequestError('latitude is not a valid number!'));
  }

  var long = req.params.long;

  if (long && !_.isNumber(long)) {
    return next(new restify.errors.BadRequestError('longitude is not a valid number!'));
  }

  var trapState = req.params.state;

  if (trapState && !TrapState.isValid(trapState)) {
    return next(new restify.errors.BadRequestError(trapState + ' is not one of valid states: '  + TrapState.VALID_STATES.join(' ,')));
  }

  return TrapService
    .updateTrap(id, lat, long, trapState)
    .then(function (data) {
      res.json(data);
      next();
    })
    .catch(function (err) {
      return errorHandle(err, res, next);
    });

};

//helpers

function errorHandle(err, res, next) {
  if (err.code && err.code === 101) {
    err.statusCode = 404;
  } else {
    err.statusCode = err.statusCode || 500;
  }

  res.send(new restify.codeToHttpError(err.statusCode, err.error));
  return next(false);
}

module.exports = TrapController;
