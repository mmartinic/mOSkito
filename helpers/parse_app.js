var Parse = require('node-parse-api').Parse;
var parseConfig = require('../config/config.json').parse;

var options = {
  app_id: parseConfig.appId,
  master_key: parseConfig.masterKey
};

var app = new Parse(options);

module.exports = app;
