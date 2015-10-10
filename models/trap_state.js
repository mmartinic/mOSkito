var TrapState = function TrapState() {};
var _ = require('lodash');

TrapState.DEFAULT_STATE = '';
TrapState.VALID_STATES = ['active', 'inactive', TrapState.DEFAULT_STATE];

TrapState.isValid = function isValid (state){
  return _.contains(TrapState.VALID_STATES, state);
};

module.exports = TrapState;
