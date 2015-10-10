var TrapModel = function TrapModel() {
};
var TrapState = require('./trap_state');

TrapModel.getTrap = function getTrap(parseTrap) {
  return {
    id : parseTrap.objectId,
    creatorId: parseTrap.creator ? parseTrap.creator.objectId : '',
    state: parseTrap.state || TrapState.DEFAULT_STATE,
    lat: parseTrap.geo.latitude,
    long: parseTrap.geo.longitude
  };
};

TrapModel.getTrapFromParams = function getTrapFromParams(id, creatorId, lat, long, state) {
  var trap = TrapModel.getTrap(TrapModel.createParseTrap(creatorId, lat, long, state));
  trap.id = id;
  return trap;
};

TrapModel.createParseTrap = function createParseTrap(creatorId, lat, long, state) {
  var trapState = state || '';
  if (! TrapState.isValid(state)) {
    throw state + ' is not one of valid states ' + TrapState.VALID_STATES.join(' ,');
  }

  return {
    geo: {
      __type: 'GeoPoint',
      latitude: lat,
      longitude: long
    },
    type: 'trap',
    state: trapState || TrapState.DEFAULT_STATE,
    creator: {
      __type: 'Pointer',
      className: '_User',
      objectId: creatorId || ''
    }
  };
};

module.exports = TrapModel;
