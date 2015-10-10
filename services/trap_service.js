var TrapService = function TrapService() {};
var Trap = require('../models/trap');
var TrapState = require('../models/trap_state');
var parseApp = require('../helpers/parse_app');
var rsvp = require('rsvp');
var _ = require('lodash');

TrapService.saveTrap = function saveTrap(creatorId, lat, long, state) {
  var parseTrap = Trap.createParseTrap(creatorId, lat, long, state);
  return saveTrapToParse(parseTrap);
};

TrapService.saveParseTrap = function saveParseTrap(parseTrap) {
  return saveTrapToParse(parseTrap);
};

TrapService.getTraps = function getTraps(limit, state) {

  var queryLimit =  limit ? parseInt(limit, 10) : 0 ;

  return new rsvp.Promise(function (resolve, reject) {

    var query = {
      where: {
        type: 'trap'
      },
      count: 1,
      order: '-createdAt'
    };

    if (_.isNumber(queryLimit) && queryLimit > 0) {
      query.limit = queryLimit;
    }

    if (state){
      query.where.state = state;
    }

    parseApp.find('trap', query, function (error, response) {
      error ? reject(error) : resolve(response);
    });
  });
};

TrapService.getTrap = function getTrap(id) {

  return new rsvp.Promise(function (resolve, reject) {
    parseApp.find('trap', {objectId: id}, function (error, response) {
      error ? reject(error) : resolve(response);
    });
  });
};

TrapService.deleteTrap = function deleteTrap(id) {

  return new rsvp.Promise(function (resolve, reject) {

    parseApp.delete('trap', id, function (error, response) {

      error ? reject(error) : resolve(response);
    });
  });
};

TrapService.updateTrap = function updateTrap(id, lat, long, state){
  return new rsvp.Promise(function (resolve, reject) {

    if (!id) {
      throw id + ' is not a valid id';
    }

    var trap = {};
    if (state === TrapState.DEFAULT_STATE || state) {
      trap.state = state
    }

    if (lat) {
      trap.geo = trap.geo || {__type: 'GeoPoint'};
      trap.geo.latitude = lat;
    }

    if (long) {
      trap.geo = trap.geo || {__type: 'GeoPoint'};
      trap.geo.longitude = long;
    }

    if (_.isEmpty(trap)){
      return resolve({});
    }

    parseApp.update('trap', id, trap, function (error, response) {
      error ? reject(error) : resolve(response);
    });
  });
};

//helpers
function saveTrapToParse(parseTrap) {
  return new rsvp.Promise(function (resolve, reject) {
    parseApp.insert('trap', parseTrap, function (err, response) {
      err ? reject(err) : resolve(response);
    });
  });

}

module.exports = TrapService;
