var Parse = require('node-parse-api').Parse;
var parseConfig = require('../config/config.json').parse;

var options = {
  app_id: parseConfig.appId,
  master_key: parseConfig.master_key
};

var app = new Parse(options);

module.exports = app;
