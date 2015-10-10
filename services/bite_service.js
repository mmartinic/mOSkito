var BiteService = function BiteService() {};
var Bite = require('../models/bite');
var parseApp = require('../helpers/parse_app');
var rsvp = require('rsvp');
var _ = require('lodash');

BiteService.saveBite = function saveBite(userId, lat, long) {
  var parseBite = Bite.createParseBite(userId, lat, long);
  return saveBiteToParse(parseBite);
};

BiteService.saveParseBite = function saveParseBite(parseBite) {
  return saveBiteToParse(parseBite);
};

BiteService.getBites = function getBites(limit) {

  var queryLimit =  limit ? parseInt(limit, 10) : 0 ;

  return new rsvp.Promise(function (resolve, reject) {

    var query = {
      where: {
        type: 'bite'
      },
      count: 1,
      order: '-createdAt'
    };

    if (_.isNumber(queryLimit) && queryLimit > 0) {
      query.limit = queryLimit;
    }

    parseApp.find('bite', query, function (error, response) {
      error ? reject(error) : resolve(response);
    });
  });
};

//helpers
function saveBiteToParse(parseBite) {
  return new rsvp.Promise(function (resolve, reject) {
    parseApp.insert('bite', parseBite, function (err, response) {
      err ? reject(err) : resolve(response);
    });
  });

}

module.exports = BiteService;
